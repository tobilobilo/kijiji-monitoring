import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Ads from "./Main/Ads";
import { useParams } from "react-router-dom";
import config from "../config";
import { useProfileStore } from "../store";

interface App {
  loadProfile?: boolean;
}

function App({ loadProfile = false }: App) {
  const profile = loadProfile
    ? useParams().profileName!
    : config.DEFAULT_PROFILE;

  //const [categoriesProfile, setCategoriesProfile] = useState<Profile>();
  //const [categoriesCustom, setCategoriesCustom] = useState([]);

  const profileStore = useProfileStore();

  const [errorLoadingProfile, setErrorLoadingProfile] = useState(null);
  if (errorLoadingProfile)
    throw new Error("Profil non trouvé...", errorLoadingProfile);

  function searchProfile() {
    fetch(`data/profiles/${profile}.json`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        profileStore.loadProfile(response);
      })
      .catch((error) => {
        setErrorLoadingProfile(error);
      });
  }

  useEffect(() => {
    searchProfile();
  }, []);

  return (
    <>
      <Header />
      <Ads />
    </>
  );
}

export default App;
