import React, { useReducer, useEffect } from "react";
import { Inbox } from "../utils/types";
import { inbox as defaultInbox } from "../data/inbox";
import { useIndexedDB } from "../utils/hooks/useIndexedDB";

type User = {
  name: string;
  image: string;
};

type ChatContextProp = {
  user: User;
  inbox: Inbox[];
  activeChat?: Inbox;
  onChangeChat: (chat: Inbox) => void;
  setInbox: React.Dispatch<React.SetStateAction<Inbox[]>>;
};

type ChatAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_INBOX'; payload: Inbox[] }
  | { type: 'SET_ACTIVE_CHAT'; payload: Inbox }
  | { type: 'LOAD_INITIAL_DATA'; payload: { user: User; inbox: Inbox[]; activeChat?: Inbox } };

type ChatState = {
  user: User;
  inbox: Inbox[];
  activeChat?: Inbox;
};

const initialState: ChatState = {
  user: { name: "Devanjoy Das", image: "https://devanjoy-portfolio.vercel.app/assets/images/DevanjoyDas.jpeg" },
  inbox: defaultInbox,
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_INBOX':
      return { ...state, inbox: action.payload };
    case 'SET_ACTIVE_CHAT':
      return { ...state, activeChat: action.payload };
    case 'LOAD_INITIAL_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const ChatContext = React.createContext<ChatContextProp>({
  ...initialState,
  onChangeChat() {
    throw new Error();
  },
  setInbox: () => {}
});

export default function ChatProvider(props: { children: any }) {
  const { children } = props;
  const { isLoading, error, setData, getData } = useIndexedDB();
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedUser = await getData('user');
        const storedInbox = await getData('inbox');
        const storedActiveChat = await getData('activeChat');

        dispatch({
          type: 'LOAD_INITIAL_DATA',
          payload: {
            user: storedUser || initialState.user,
            inbox: storedInbox || initialState.inbox,
            activeChat: storedActiveChat
          }
        });
      } catch (err) {
        console.error('Failed to load initial data:', err);
      }
    };

    if (!isLoading && !error) {
      loadInitialData();
    }
  }, [isLoading, error, getData]);

  useEffect(() => {
    if (!isLoading && !error) {
      setData('user', state.user);
      setData('inbox', state.inbox);
      if (state.activeChat) {
        setData('activeChat', state.activeChat);
      }
    }
  }, [state.user, state.inbox, state.activeChat, isLoading, error, setData]);

  const handleChangeChat = (chat: Inbox) => {
    dispatch({ type: 'SET_ACTIVE_CHAT', payload: chat });
  };

  const setInbox = (value: React.SetStateAction<Inbox[]>) => {
    const newInbox = typeof value === 'function' 
      ? value(state.inbox)
      : value;
    dispatch({ type: 'SET_INBOX', payload: newInbox });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error initializing database</div>;
  }

  return (
    <ChatContext.Provider 
      value={{ 
        user: state.user, 
        inbox: state.inbox, 
        activeChat: state.activeChat, 
        onChangeChat: handleChangeChat,
        setInbox 
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => React.useContext(ChatContext);