import { createContext } from "react";
import { Connection } from "../connection";

export default createContext<Connection | undefined>(undefined);
