import "dotenv/config";
import { use, expect } from "chai";
import sinonChai from "sinon-chai";

use(sinonChai);
global.expect = expect;
