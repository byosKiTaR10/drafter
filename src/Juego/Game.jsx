import { useState, useEffect } from "react";
import "./Draft.css"
import "./DraftMain.css"
import "./DraftBans.css"
import "./DraftChamps.css"
import Result from "./Result";

const Game = () => {
  const roleIcons = {
    top: <svg className='svgPosition' xmlns="http:www.w3.org/2000/svg" viewBox="0 0 15 15"><g fill="none" fillRule="evenodd"><path className="roleBg" fill="#77779F" d="M5.5 9.5h4v-4h-4z"></path><path className="roleBg" fill="#77779F" d="M15 15V1.172l-2.651 2.652v8.525H3.823L1.173 15z"></path><path fill="#FFF" d="M0 0v13.828l2.651-2.652V2.651h8.526L13.827 0z"></path></g></svg>,
    jungle: <svg className='svgPosition' xmlns="http:www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M2.886 0l.016.017C3.296.434 10.837 8.545 7.695 15c0 0-2.263-2.928-4.979-4.264 0 0 .453-3.955-2.716-6.575 0 0 4.3 1.85 5.206 4.726l.004-.017C5.275 8.582 6.1 4.6 2.886 0zM15 3.75s-3.225 2.877-2.66 6.421c0 0-2.263 1.336-2.659 2.158 0 0 .227-6.216 5.319-8.579zM11.82 0S9.33 4.315 9.555 7.5c0 0-.51.72-.68 1.336 0 0-.622-2.363-1.131-2.928 0 0 2.094-4.059 4.074-5.908z" fill="#FFF" fillRule="evenodd"></path></svg>,
    mid: <svg className='svgPosition' xmlns="http:www.w3.org/2000/svg" viewBox="0 0 15 15"><g fill="none" fillRule="evenodd"><path className="roleBg" fill="#77779F" d="M7.786 2.651L10.437 0H0v10.437l2.651-2.651V2.65zM7.214 12.349L4.563 15H15V4.563l-2.651 2.651v5.135z"></path><path fill="#FFF" d="M12.536 0L0 12.536V15h2.464L15 2.465V0z"></path></g></svg>,
    bot: <svg className='svgPosition' xmlns="http:www.w3.org/2000/svg" viewBox="0 0 15 15"><g fill="none" fillRule="evenodd"><path className="roleBg" fill="#77779F" d="M9.5 5.5h-4v4h4z"></path><path className="roleBg" fill="#77779F" d="M0 0v13.828l2.651-2.652V2.651h8.526L13.827 0z"></path><path fill="#FFF" d="M15 15V1.172l-2.651 2.652v8.525H3.823L1.173 15z"></path></g></svg>,
    support: <svg className='svgPosition' xmlns="http:www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M7.902 5.316L9.5 13.393 7.5 15l-2-1.607 1.598-8.077.402.542.402-.542zM15 3.19c-.285 2.342-3.861 2.12-3.861 2.12l1.64 2.17-2.635 1.06L9 4.906l1.74-1.716zm-10.74 0L6 4.906 4.856 8.54 2.22 7.48l1.641-2.17S.285 5.532 0 3.19h4.26zM9.372 0L10 1.11 7.5 4.179 5 1.111 5.627 0h3.746z" fill="#FFF" fillRule="evenodd"></path></svg>,
  };
  const [pickCounterBlue, setPickCounterBlue] = useState(0)
  const [banCounterBlue, setBanCounterBlue] = useState(0)
  const [pickCounterRed, setPickCounterRed] = useState(0)
  const [banCounterRed, setBanCounterRed] = useState(0)
  const [pickCounter, setPickingCounter] = useState(1)
  const [bansTeam1, setBansTeam1] = useState([])
  const [bansTeam2, setBansTeam2] = useState([])
  const [picksTeam1, setPicksTeam1] = useState([])
  const [picksTeam2, setPicksTeam2] = useState([])
  const [championsDisabled, setChampionsDisabled] = useState([])
  const [pickingSide, setPickingSide] = useState("time-pick-blue");
  const [pickingTeam, setPickingTeam] = useState("BLUE");
  const [pickOrBan, setPickOrBan] = useState("BAN")
  const [selectedChampion, setSelectedChampion] = useState()
  const roleKeys = ['top', 'jungle', 'mid', 'bot', 'support'];
  const [secondsTurn, setSecondsTurn] = useState(30);
  const [champions, setChampions] = useState([]);
  const [roleChosen, setRoleChosen] = useState()
  const [championsStatic, setChampionsStatic] = useState([])
  const [filterChamp, setFilterChamp] = useState("")
  const [modalShow, setModalShow] = useState(false);
  

  const getChampions = async () => {
    try {
      const response = await fetch('http://localhost:3030/Champions');
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
      const campeones = await response.json();
      setChampions(campeones)
      setChampionsStatic(campeones)
    } catch (error) {
      console.error('Error en la solicitud', error);
    }
  }

  useEffect(() => {
    getChampions()
  }, []);

  useEffect(() => {
    if (picksTeam2.length === 5){
      setModalShow(true);
    }
  }, [picksTeam2])

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsTurn(prevSecondsTurn => {
        if (prevSecondsTurn === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevSecondsTurn - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (event) => {
    setFilterChamp(event.target.value.toLowerCase())
  }

  useEffect(() => {
    const championsFiltered = championsStatic.filter(champion => champion.name.toLowerCase().includes(filterChamp))
    if (championsFiltered !== null || championsFiltered !== undefined){
      setChampions(championsFiltered)
    } else {
      setChampions(championsStatic)
    }
    // eslint-disable-next-line
  }, [filterChamp])

  const updateOnRoleChosen = (role) => {
    if (roleChosen === role) {
      setChampions(championsStatic)
      setRoleChosen("")
    } else {
      // eslint-disable-next-line
      const newChampions = championsStatic.filter(champion => champion.position[0].toLowerCase() === role.toLowerCase())
      setChampions(newChampions)
      setRoleChosen(role)
    }
  }

  const randomChampion = () => {
    do {
      var random = Math.floor(Math.random() * champions.length)
      var ranChamp = champions[random]
    }
    while (championsDisabled.includes(ranChamp.name))
    setSelectedChampion(ranChamp)
  }

  useEffect(() => {
    if (secondsTurn === 0) {
      if (selectedChampion === undefined || selectedChampion === null) {
        randomChampion()
      } else {
        changeClass()
      }
    }
    // eslint-disable-next-line
  }, [secondsTurn])

  useEffect(() => {
    handleChampionClick(selectedChampion)
    if (secondsTurn === 0) {
      changeClass()
    }
    // eslint-disable-next-line
  }, [selectedChampion])

  var progress = Math.floor((secondsTurn / 30) * 100);

  const handleChampionClick = (champion) => {
    setSelectedChampion(champion)
    updateChampsSelected()
  };


  const updateChampsSelected = () => {
    if (pickingTeam === "BLUE" && pickOrBan === "BAN") {
      if (bansTeam1.length > banCounterBlue) {
        setBansTeam1(bansTeam1.map((elemento, index) => {
          if (index === banCounterBlue) {
            return selectedChampion
          } else {
            return elemento
          }
        }))
      } else {
        setBansTeam1(prevBansTeam1 => [...prevBansTeam1, selectedChampion])
      }
    }
    if (pickingTeam === "RED" && pickOrBan === "BAN") {
      if (bansTeam2.length > banCounterRed) {
        setBansTeam2(bansTeam2.map((elemento, index) => {
          if (index === banCounterRed) {
            return selectedChampion
          } else {
            return elemento
          }
        }))
      } else {
        setBansTeam2(prevBansTeam2 => [...prevBansTeam2, selectedChampion])
      }
    }
    if (pickingTeam === "BLUE" && pickOrBan === "PICK") {
      if (picksTeam1.length > pickCounterBlue) {
        setPicksTeam1(picksTeam1.map((elemento, index) => {
          if (index === pickCounterBlue) {
            return selectedChampion
          } else {
            return elemento
          }
        }))
      } else {
        setPicksTeam1(prevPicksTeam1 => [...prevPicksTeam1, selectedChampion])
      }
    }
    if (pickingTeam === "RED" && pickOrBan === "PICK") {
      if (picksTeam2.length > pickCounterRed) {
        setPicksTeam2(picksTeam2.map((elemento, index) => {
          if (index === pickCounterRed) {
            return selectedChampion
          } else {
            return elemento
          }
        }))
      } else {
        setPicksTeam2(prevPicksTeam2 => [...prevPicksTeam2, selectedChampion])
      }
    }
  }

  const changeClass = () => {
    if (selectedChampion === null || selectedChampion === undefined) {
      alert("¡Elige un campeón!")
    } else {
      pickAndBans()
      setPickingCounter(pickCounter + 1)
      if ((pickCounter === 6) || (pickCounter === 16)) {
        setPickOrBan("PICK")
      }
      if (pickCounter === 12) {
        setPickOrBan("BAN")
      }
      if ((pickCounter === 6) || (9 <= pickCounter && pickCounter <= 10) || (pickCounter === 13) || (pickCounter === 15) || (17 <= pickCounter && pickCounter <= 18)) {
        setPickingSide("time-pick-blue")
        setPickingTeam("BLUE")
      }
      if ((7 <= pickCounter && pickCounter <= 8) || (11 <= pickCounter && pickCounter <= 12) || (pickCounter === 14) || (pickCounter === 16) || (pickCounter === 19)) {
        setPickingSide("time-pick-red")
        setPickingTeam("RED")
      }
      if (pickCounter < 6) {
        pickingSide === "time-pick-blue" ? setPickingSide("time-pick-red") : setPickingSide("time-pick-blue")
        pickingTeam === "BLUE" ? setPickingTeam("RED") : setPickingTeam("BLUE")
      }
      setSecondsTurn(30)
      setSelectedChampion(null)
    }
  };
  const pickAndBans = () => {
    if (pickingTeam === "BLUE" && pickOrBan === "BAN") {
      setBanCounterBlue(banCounterBlue + 1)
    }
    if (pickingTeam === "RED" && pickOrBan === "BAN") {
      setBanCounterRed(banCounterRed + 1)
    }
    if (pickingTeam === "BLUE" && pickOrBan === "PICK") {
      setPickCounterBlue(pickCounterBlue + 1)
    }
    if (pickingTeam === "RED" && pickOrBan === "PICK") {
      setPickCounterRed(pickCounterRed + 1)
    }
    setChampionsDisabled(prevChamps => [...prevChamps, selectedChampion.name])
  }
  return (
    <div className="Draft">
      <div className="container-draft">
        {/* --------------------------------------------------------------------------------------------------------- */}

        <main>
          <div className="header-main-draft">
            <div className="teams team-1 pick-turn">
              <span>BLUE TEAM</span>
            </div>
            <div className={pickingSide}>
              <h2 className="pick-team"><span>
                {pickingTeam} </span> TEAM {pickOrBan}
              </h2>
              <div className="progress-container">
                <div className="progress-bar progress-bar-left w-full bg-gray-200 rounded-full  dark:bg-gray-700" >
                  <div className="progress-width progress-left bg-blue-600  rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="timer">
                  <span className="span-timer">{secondsTurn}</span>
                </div>
                <div className="progress-bar progress-bar-right  w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700" >
                  <div className="progress-width progress-right bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
            <div className="teams team-2">
              <span>RED TEAM</span>
            </div>
          </div>

          {/* --------------------------------------------------------------------------------------------------------- */}

          <div className="main-draft-picks">
            <div className="picks picks-blue">
              {picksTeam1[0] != null ? (
                <div className="champ-container">
                  <img src={picksTeam1[0]?.src} alt="Picked Champion"></img>
                  <span className="name-champ-picked">
                    {picksTeam1[0]?.name.charAt(0).toUpperCase() + picksTeam1[0]?.name.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="champ-container">
                  <span className="position">{roleIcons["top"]}</span>
                </div>
              )}
              {picksTeam1[1] != null ? (
                <div className="champ-container">
                  <img src={picksTeam1[1]?.src} alt="Picked Champion"></img>
                  <span className="name-champ-picked">
                    {picksTeam1[1]?.name.charAt(0).toUpperCase() + picksTeam1[1]?.name.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="champ-container">
                  <span className="position">{roleIcons["jungle"]}</span>
                </div>
              )}
              {picksTeam1[2] != null ? (
                <div className="champ-container">
                  <img src={picksTeam1[2]?.src} alt="Picked Champion"></img>
                  <span className="name-champ-picked">
                    {picksTeam1[2]?.name.charAt(0).toUpperCase() + picksTeam1[2]?.name.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="champ-container">
                  <span className="position">{roleIcons["mid"]}</span>
                </div>
              )}
              <span className="spacer"></span>
              {picksTeam1[3] != null ? (
                <div className="champ-container">
                  <img src={picksTeam1[3]?.src} alt="Picked Champion"></img>
                  <span className="name-champ-picked">
                    {picksTeam1[3]?.name.charAt(0).toUpperCase() + picksTeam1[3]?.name.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="champ-container">
                  <span className="position">{roleIcons["bot"]}</span>
                </div>
              )}
              {picksTeam1[4] != null ? (
                <div className="champ-container">
                  <img src={picksTeam1[4]?.src} alt="Picked Champion"></img>
                  <span className="name-champ-picked">
                    {picksTeam1[4]?.name.charAt(0).toUpperCase() + picksTeam1[4]?.name.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="champ-container">
                  <span className="position">{roleIcons["support"]}</span>
                </div>
              )}
            </div>

            {/* --------------------------------------------------------------------------------------------------------- */}

            <div className="champs">
              <div className="header-champs">
                <div className="positions-champs">
                  {roleKeys.map((role, index) => (
                    <span key={index} className={role === roleChosen ? "position-search position-search-chosen" : "position-search"} onClick={() => updateOnRoleChosen(role)}>{roleIcons[role]}</span>
                  ))}
                </div>
                <div className="search-container">
                  <input type="text" className="search-champs" placeholder="Search..." value={filterChamp} onChange={handleChange} />
                </div>
              </div>
              <span style={{ width: "95%", border: "solid 1px white" }}></span>
              <div className="champs-to-select">
                {champions?.map((champ, index) => (
                  <div key={index + "champion-container"} className={`champion-container ${championsDisabled.includes(champ.name) ? 'disabled' : ''}`} onClick={() => handleChampionClick(champ)}>
                    <div key={index} className="champion-select">
                      <img src={champ.src} alt="" className="champion-select-img" />
                    </div>
                    <span>{champ.name.charAt(0).toUpperCase() + champ.name.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* --------------------------------------------------------------------------------------------------------- */}

            <div className="picks picks-red">
              {picksTeam2[0] != null ? (
                <div className="champ-container">
                  <img src={picksTeam2[0]?.src} alt="Picked Champion"></img>
                  <span className="name-champ-picked">
                    {picksTeam2[0]?.name.charAt(0).toUpperCase() + picksTeam2[0]?.name.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="champ-container">
                  <span className="position">{roleIcons["top"]}</span>
                </div>
              )}
              {picksTeam2[1] != null ? (
                <div className="champ-container">
                  <img src={picksTeam2[1]?.src} alt="Picked Champion"></img>
                  <span className="name-champ-picked">
                    {picksTeam2[1]?.name.charAt(0).toUpperCase() + picksTeam2[1]?.name.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="champ-container">
                  <span className="position">{roleIcons["jungle"]}</span>
                </div>
              )}
              {picksTeam2[2] != null ? (
                <div className="champ-container">
                  <img src={picksTeam2[2]?.src} alt="Picked Champion"></img>
                  <span className="name-champ-picked">
                    {picksTeam2[2]?.name.charAt(0).toUpperCase() + picksTeam2[2]?.name.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="champ-container">
                  <span className="position">{roleIcons["mid"]}</span>
                </div>
              )}
              <span className="spacer"></span>
              {picksTeam2[3] != null ? (
                <div className="champ-container">
                  <img src={picksTeam2[3]?.src} alt="Picked Champion"></img>
                  <span className="name-champ-picked">
                    {picksTeam2[3]?.name.charAt(0).toUpperCase() + picksTeam2[3]?.name.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="champ-container">
                  <span className="position">{roleIcons["bot"]}</span>
                </div>
              )}
              {picksTeam2[4] != null ? (
                <div className="champ-container">
                  <img src={picksTeam2[4]?.src} alt="Picked Champion"></img>
                  <span className="name-champ-picked">
                    {picksTeam2[4]?.name.charAt(0).toUpperCase() + picksTeam2[4]?.name.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="champ-container">
                  <span className="position">{roleIcons["support"]}</span>
                </div>
              )}
            </div>
          </div>
          <div className="main-draft-bans">
            <div className="bans bans-left">
              <div className="ban ban-left">
                {bansTeam1[0] != null ? (
                  <img className="ban-champ-img" src={bansTeam1[0]?.src} alt="Banned Champion"></img>
                ) : (
                  ""
                )}
              </div>
              <div className="ban ban-left">
                {bansTeam1[1] != null ? (
                  <img className="ban-champ-img" src={bansTeam1[1]?.src} alt="Banned Champion"></img>
                ) : (
                  ""
                )}
              </div>
              <div className="ban ban-left">
                {bansTeam1[2] != null ? (
                  <img className="ban-champ-img" src={bansTeam1[2]?.src} alt="Banned Champion"></img>
                ) : (
                  ""
                )}
              </div>
              <div className="space"></div>
              <div className="ban ban-left">
                {bansTeam1[3] != null ? (
                  <img className="ban-champ-img" src={bansTeam1[3]?.src} alt="Banned Champion"></img>
                ) : (
                  ""
                )}
              </div>
              <div className="ban ban-left">
                {bansTeam1[4] != null ? (
                  <img className="ban-champ-img" src={bansTeam1[4]?.src} alt="Banned Champion"></img>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="btn-lock-container">
              <button className="btn-lock" onClick={changeClass}>LOCK IN</button>
            </div>
            <div className="bans bans-right">
              <div className="ban ban-right">
                {bansTeam2[0] != null ? (
                  <img className="ban-champ-img" src={bansTeam2[0]?.src} alt="Banned Champion"></img>
                ) : (
                  ""
                )}
              </div>
              <div className="ban ban-right">
                {bansTeam2[1] != null ? (
                  <img className="ban-champ-img" src={bansTeam2[1]?.src} alt="Banned Champion"></img>
                ) : (
                  ""
                )}
              </div>
              <div className="ban ban-right">
                {bansTeam2[2] != null ? (
                  <img className="ban-champ-img" src={bansTeam2[2]?.src} alt="Banned Champion"></img>
                ) : (
                  ""
                )}
              </div>
              <div className="space"></div>
              <div className="ban ban-right">
                {bansTeam2[3] != null ? (
                  <img className="ban-champ-img" src={bansTeam2[3]?.src} alt="Banned Champion"></img>
                ) : (
                  ""
                )}
              </div>
              <div className="ban ban-right">
                {bansTeam2[4] != null ? (
                  <img className="ban-champ-img" src={bansTeam2[4]?.src} alt="Banned Champion"></img>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Game;
