import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import { setUserName, setUniqueID, setUserType } from "../store/activateSlice";
export function useLoadingWithRefresh({ setUserInfo }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://podbackend.herokuapp.com/api/refresh`,
          {
            withCredentials: true,
          }
        );
        dispatch(setUserName({ username: data.user.username }));
        dispatch(setUniqueID({ unique_id: data.user.unique_id }));
        dispatch(setUserType({ usertype: data.user.usertype }));
        dispatch(setAuth({ user: data.username }));
        setUserInfo(data.user);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);
  return { loading };
}
