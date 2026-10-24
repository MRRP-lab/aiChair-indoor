import { useContext } from "react";
import ConnectionContext from "../contexts/connection-context";
import type { Connection } from "../connection";

export default function useConnection(): Connection {
  const connection = useContext(ConnectionContext);
  if (connection === undefined) {
    throw new Error(
      "useConnection must be used within a ConnectionContext.Provider",
    );
  }
  return connection;
}
