import type { KnowledgeDocument } from "./aitam";

import { CSE_FACULTY } from "./faculty-data/cse";
import { CSM_FACULTY } from "./faculty-data/csm";
import { CSD_FACULTY } from "./faculty-data/csd";
import { IT_FACULTY } from "./faculty-data/it";
import { ECE_FACULTY } from "./faculty-data/ece";
import { EEE_FACULTY } from "./faculty-data/eee";
import { CIVIL_FACULTY } from "./faculty-data/civil";
import { MECHANICAL_FACULTY } from "./faculty-data/mech";
import { BSH_FACULTY } from "./faculty-data/bsh";
import { MBA_FACULTY } from "./faculty-data/mba";
import { BBA_FACULTY } from "./faculty-data/bba";
import { MCA_FACULTY } from "./faculty-data/mca";

export const FACULTY_KNOWLEDGE: KnowledgeDocument[] = [
  CSE_FACULTY,
  CSM_FACULTY,
  CSD_FACULTY,
  IT_FACULTY,
  ECE_FACULTY,
  EEE_FACULTY,
  CIVIL_FACULTY,
  MECHANICAL_FACULTY,
  BSH_FACULTY,
  MBA_FACULTY,
  BBA_FACULTY,
  MCA_FACULTY,
];