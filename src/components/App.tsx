import { useState, useEffect } from "react";
import Header from "./Header/Header";
import { useParams } from "react-router-dom";

const defaultProfile = "jp";

interface App {
  loadProfile?: boolean;
}

function App({ loadProfile = false }: App) {
  const [profile, setProfile] = useState(defaultProfile);
  const profileSlug = useParams().profileName!;

  const [categoriesProfile, setCategoriesProfile] = useState([]);
  const [categoriesCustom, setCategoriesCustom] = useState([]);

  const searchProfile = () => {
    console.log("i", profile);
    fetch("../../src/data/profiles/jp.json", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
    //throw new Error("Profile non trouvé...");
  };

  useEffect(() => {
    if (loadProfile) setProfile(profileSlug);
    searchProfile();
  }, []);

  return (
    <>
      <Header profile={profile} />
    </>
  );
}

export default App;
