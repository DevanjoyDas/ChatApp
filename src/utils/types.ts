export type MessageStatus = "READ" | "DELIVERED" | "SENT";

export type Inbox = {
  id: string;
  name: string;
  image: string;
};

export type Message =
{
  [x: string]: any;
  id: string;
}
