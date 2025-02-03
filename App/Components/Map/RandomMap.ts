import { Maps} from "./Maps";

export function RandomMap(): number {
  return Math.floor(Math.random() * Maps.length);
}
