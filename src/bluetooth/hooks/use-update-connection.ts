import { useContext } from "react";
import type { Connection } from "../connection";
import connectionManagerContext from "../contexts/connection-manager-context";

export default function useUpdateConnection(): (c: Connection) => void {
  const ctx = useContext(connectionManagerContext);
  if (ctx === undefined) {
    throw new Error(
      "useUpdateConnection must be used within a ConnectionContext.Provider",
    );
  }
  return ctx.setConnection;
}
