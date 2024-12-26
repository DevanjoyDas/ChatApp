import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useNavigateToChat(activeInbox?: any) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeInbox) {
      navigate("/");
    }
  }, [activeInbox, navigate]);
}
