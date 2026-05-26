// ─── Types ────────────────────────────────────────────────────────────────────

export type ViolationType =
  | "detencion_arbitraria"
  | "tortura"
  | "desaparicion_forzada"
  | "ejecucion_extrajudicial"
  | "persecucion_politica"
  | "exilio"
  | "censura"
  | "otro";

export type VerificationStatus = "verified" | "pending" | "unverified";
export type PrivacyLevel = "public" | "private" | "anonymized";
export type ReporterProfile =
  | "victim"
  | "family"
  | "ex_political_prisoner"
  | "defender"
  | "witness"
  | "researcher";

export interface TraceabilityEntry {
  action: string;
  actor: string;
  date: string;
  note?: string;
}

export interface Case {
  id: string;
  title: string;
  type: ViolationType;
  location: string;
  state: string;
  country: string;
  date: string;
  year: number;
  verificationStatus: VerificationStatus;
  privacyLevel: PrivacyLevel;
  reporterProfile: ReporterProfile;
  summary: string;
  fullTestimony: string;
  aiAnalysis: {
    keywords: string[];
    actorsMentioned: string[];
    placesMentioned: string[];
    possibleConnections: string[];
  };
  traceability: TraceabilityEntry[];
}

// ─── Label Maps ───────────────────────────────────────────────────────────────

export const violationLabels: Record<ViolationType, string> = {
  detencion_arbitraria: "Detención arbitraria",
  tortura: "Tortura",
  desaparicion_forzada: "Desaparición forzada",
  ejecucion_extrajudicial: "Ejecución extrajudicial",
  persecucion_politica: "Persecución política",
  exilio: "Exilio forzado",
  censura: "Censura",
  otro: "Otro",
};

export const verificationLabels: Record<VerificationStatus, string> = {
  verified: "Verificado",
  pending: "En revisión",
  unverified: "Sin verificar",
};

export const privacyLabels: Record<PrivacyLevel, string> = {
  public: "Público",
  private: "Privado",
  anonymized: "Anonimizado",
};

export const profileLabels: Record<ReporterProfile, string> = {
  victim: "Víctima",
  family: "Familiar",
  ex_political_prisoner: "Ex preso político",
  defender: "Defensor DDHH",
  witness: "Testigo",
  researcher: "Investigador",
};

// ─── Mock Cases ───────────────────────────────────────────────────────────────

export const mockCases: Case[] = [
  {
    id: "CAS-2024-001",
    title: "Detención y aislamiento en instalaciones del SEBIN",
    type: "detencion_arbitraria",
    location: "Caracas",
    state: "Distrito Capital",
    country: "Venezuela",
    date: "2024-03-14",
    year: 2024,
    verificationStatus: "verified",
    privacyLevel: "anonymized",
    reporterProfile: "ex_political_prisoner",
    summary:
      "Ciudadano detenido sin orden judicial tras participar en marcha pacífica. Mantenido en aislamiento por 47 días en El Helicoide sin acceso a defensa legal.",
    fullTestimony: `El 14 de marzo de 2024, aproximadamente a las 6:30 de la mañana, agentes del SEBIN irrumpieron en mi residencia sin presentar ninguna orden judicial. Me indicaron que debía acompañarlos "para unas preguntas". No me permitieron avisar a mi familia ni contactar a un abogado.

Fui trasladado a las instalaciones de El Helicoide en Caracas, donde permanecí 47 días en régimen de aislamiento. Durante ese tiempo no tuve acceso a defensa legal, y mi familia no fue notificada de mi paradero sino hasta el décimo día.

Durante los primeros tres días fui sometido a interrogatorios prolongados, con privación de sueño. Los interrogadores preguntaban sobre mi relación con organizaciones de sociedad civil y sobre contactos en el exterior. Me presionaron para que firmara declaraciones que incriminaban a compañeros de trabajo.

Fui liberado sin cargos formales el 29 de abril de 2024, con la advertencia de que "no hablara" de lo ocurrido.`,
    aiAnalysis: {
      keywords: [
        "SEBIN",
        "El Helicoide",
        "aislamiento",
        "interrogatorio",
        "sin orden judicial",
        "sociedad civil",
        "privación de sueño",
        "liberado sin cargos",
      ],
      actorsMentioned: ["SEBIN", "agentes no identificados"],
      placesMentioned: ["El Helicoide", "Caracas", "Distrito Capital"],
      possibleConnections: [
        "CAS-2024-003 — patrón similar de detención sin orden, Caracas",
        "CAS-2023-089 — mismo patrón de interrogatorio en El Helicoide",
        "CAS-2024-007 — misma semana, posible operación coordinada",
      ],
    },
    traceability: [
      {
        action: "Ingreso al sistema",
        actor: "Sistema automático",
        date: "2024-05-02",
        note: "Testimonio recibido vía formulario seguro",
      },
      {
        action: "Primera revisión",
        actor: "Analista R.M.",
        date: "2024-05-04",
        note: "Testimonio coherente, fuentes identificadas",
      },
      {
        action: "Verificación cruzada",
        actor: "Investigador senior J.C.",
        date: "2024-05-09",
        note: "Corroborado con registros de familiares y abogado",
      },
      {
        action: "Aprobación de publicación",
        actor: "Comité de revisión",
        date: "2024-05-12",
        note: "Publicado en modo anonimizado por solicitud del testigo",
      },
    ],
  },
  {
    id: "CAS-2024-002",
    title: "Tortura durante detención en instalaciones de las FAES",
    type: "tortura",
    location: "Maracaibo",
    state: "Zulia",
    country: "Venezuela",
    date: "2024-01-22",
    year: 2024,
    verificationStatus: "verified",
    privacyLevel: "private",
    reporterProfile: "victim",
    summary:
      "Joven de 24 años detenido durante operativo de las FAES en barrio La Cañada. Sometido a tortura física durante 6 horas antes de ser liberado con advertencia.",
    fullTestimony: `Testimonio reservado por solicitud de la víctima. Caso documentado con evidencia médica corroborante y testimonios de dos testigos presenciales.`,
    aiAnalysis: {
      keywords: [
        "FAES",
        "La Cañada",
        "tortura",
        "operativo",
        "Maracaibo",
        "evidencia médica",
        "joven",
      ],
      actorsMentioned: ["FAES", "funcionarios no identificados"],
      placesMentioned: ["La Cañada", "Maracaibo", "Zulia"],
      possibleConnections: [
        "CAS-2024-008 — mismo barrio, operativo de la misma semana",
        "CAS-2023-156 — patrón FAES en Maracaibo, zona oeste",
      ],
    },
    traceability: [
      {
        action: "Ingreso al sistema",
        actor: "Organización aliada VZDHH",
        date: "2024-02-01",
      },
      {
        action: "Documentación médica",
        actor: "Médico forense aliado",
        date: "2024-02-03",
        note: "Informe médico adjunto al expediente cifrado",
      },
      {
        action: "Verificación completada",
        actor: "Analista senior",
        date: "2024-02-10",
      },
    ],
  },
  {
    id: "CAS-2023-047",
    title: "Desaparición forzada tras detención en protesta estudiantil",
    type: "desaparicion_forzada",
    location: "Valencia",
    state: "Carabobo",
    country: "Venezuela",
    date: "2023-07-05",
    year: 2023,
    verificationStatus: "verified",
    privacyLevel: "public",
    reporterProfile: "family",
    summary:
      "Estudiante universitario detenido durante manifestación en la Universidad de Carabobo. Familia sin información 22 días. Liberado con restricciones de movimiento.",
    fullTestimony: `Mi hijo fue detenido el 5 de julio de 2023 frente a los portones principales de la Universidad de Carabobo, en Valencia. Estudiaba tercer año de Ingeniería Industrial. Participaba en una manifestación pacífica que reclamaba condiciones dignas para los profesores.

Agentes de la Guardia Nacional Bolivariana y de la PNB dispersaron la manifestación con gases lacrimógenos y perdigones. Varios estudiantes fueron detenidos. Mi hijo fue uno de ellos.

Durante 22 días no supimos absolutamente nada de él. Acudimos a la Fiscalía, al SEBIN, a la GNB, al CICPC. Nadie nos daba información. Una ONG nos ayudó a interponer un habeas corpus.

El día 22 nos llamaron de una comisaría en Valencia diciendo que podíamos buscarlo. Tenía marcas de golpes en el cuerpo. Dice que pasó varios días en una instalación que no pudo identificar. Ahora tiene restricción de moverse del estado Carabobo y debe presentarse cada dos semanas ante el tribunal.`,
    aiAnalysis: {
      keywords: [
        "Universidad de Carabobo",
        "GNB",
        "PNB",
        "habeas corpus",
        "estudiante",
        "protesta",
        "22 días",
        "restricción de movimiento",
      ],
      actorsMentioned: [
        "Guardia Nacional Bolivariana",
        "PNB",
        "SEBIN",
        "CICPC",
        "Fiscalía",
      ],
      placesMentioned: [
        "Valencia",
        "Carabobo",
        "Universidad de Carabobo",
        "comisaría Valencia",
      ],
      possibleConnections: [
        "CAS-2023-048 — misma fecha, misma manifestación UC",
        "CAS-2023-049 — patrón coordinado, estudiantes UC",
        "CAS-2019-234 — patrón histórico de represión en Carabobo",
      ],
    },
    traceability: [
      {
        action: "Ingreso al sistema",
        actor: "Organización CASLA",
        date: "2023-07-28",
      },
      {
        action: "Entrevista con familiar",
        actor: "Investigadora M.G.",
        date: "2023-08-02",
      },
      {
        action: "Verificación legal",
        actor: "Abogado aliado",
        date: "2023-08-15",
        note: "Habeas corpus verificado en registros del TSJ",
      },
      {
        action: "Publicado",
        actor: "Comité editorial",
        date: "2023-08-20",
      },
    ],
  },
  {
    id: "CAS-2022-089",
    title: "Persecución política contra concejal electo",
    type: "persecucion_politica",
    location: "Barinas",
    state: "Barinas",
    country: "Venezuela",
    date: "2022-03-18",
    year: 2022,
    verificationStatus: "verified",
    privacyLevel: "public",
    reporterProfile: "victim",
    summary:
      "Funcionario electo sometido a proceso judicial con cargos fabricados tras críticas al gobierno regional. 14 meses bajo detención domiciliaria antes de ser liberado.",
    fullTestimony: `Testimonio disponible. Acceso autorizado para investigadores acreditados.`,
    aiAnalysis: {
      keywords: [
        "concejal",
        "cargos fabricados",
        "Barinas",
        "detención domiciliaria",
        "persecución política",
        "oposición",
      ],
      actorsMentioned: ["Fiscalía", "Tribunal de control Barinas"],
      placesMentioned: ["Barinas"],
      possibleConnections: [
        "CAS-2022-023 — patrón persecución a funcionarios electos de oposición",
      ],
    },
    traceability: [
      {
        action: "Ingreso",
        actor: "Foro Penal Venezolano",
        date: "2022-04-05",
      },
      {
        action: "Verificado",
        actor: "Analista J.R.",
        date: "2022-04-20",
      },
    ],
  },
  {
    id: "CAS-2021-023",
    title: "Ejecución extrajudicial durante operativo FAES — La Guaira",
    type: "ejecucion_extrajudicial",
    location: "La Guaira",
    state: "La Guaira",
    country: "Venezuela",
    date: "2021-08-11",
    year: 2021,
    verificationStatus: "verified",
    privacyLevel: "anonymized",
    reporterProfile: "family",
    summary:
      "Hombre de 31 años fallecido durante operativo de las FAES. Familiares reportan que fue sacado del domicilio y ejecutado. La escena fue manipulada para simular un enfrentamiento.",
    fullTestimony: `Caso documentado con fotografías y testimonios de cuatro vecinos. Informe forense independiente disponible.`,
    aiAnalysis: {
      keywords: [
        "FAES",
        "ejecución extrajudicial",
        "La Guaira",
        "manipulación de escena",
        "testigos",
        "informe forense",
      ],
      actorsMentioned: ["FAES", "funcionarios no identificados"],
      placesMentioned: ["La Guaira"],
      possibleConnections: [
        "CAS-2021-024 — mismo día, mismo operativo FAES",
        "CAS-2020-156 — patrón FAES, escena manipulada",
      ],
    },
    traceability: [
      {
        action: "Ingreso",
        actor: "Comisión DDHH local",
        date: "2021-08-15",
      },
      {
        action: "Documentación fotográfica",
        actor: "Documentalista aliado",
        date: "2021-08-16",
      },
      {
        action: "Verificado — referenciado en informe ONU",
        actor: "Misión Internacional ONU",
        date: "2021-09-02",
      },
    ],
  },
  {
    id: "CAS-2020-156",
    title: "Detenciones masivas bajo argumento de cuarentena COVID-19",
    type: "detencion_arbitraria",
    location: "San Cristóbal",
    state: "Táchira",
    country: "Venezuela",
    date: "2020-05-04",
    year: 2020,
    verificationStatus: "pending",
    privacyLevel: "anonymized",
    reporterProfile: "witness",
    summary:
      "Múltiples ciudadanos detenidos bajo argumento de violar cuarentena COVID-19, recluidos en condiciones insalubres sin proceso judicial.",
    fullTestimony: `En revisión por el equipo de verificación. Testimonio de testigo presencial recibido.`,
    aiAnalysis: {
      keywords: [
        "COVID-19",
        "cuarentena",
        "detención masiva",
        "Táchira",
        "San Cristóbal",
        "condiciones insalubres",
      ],
      actorsMentioned: ["GNB", "PNB", "autoridades locales"],
      placesMentioned: ["San Cristóbal", "Táchira"],
      possibleConnections: [
        "CAS-2020-157 — misma fecha, mismo estado",
      ],
    },
    traceability: [
      {
        action: "Ingreso",
        actor: "ONG Aliada",
        date: "2020-05-10",
      },
      {
        action: "En proceso de verificación",
        actor: "Analista L.P.",
        date: "2020-06-01",
      },
    ],
  },
  {
    id: "CAS-2019-234",
    title: "Tortura sistemática en La Tumba — operativo abril 2019",
    type: "tortura",
    location: "Caracas",
    state: "Distrito Capital",
    country: "Venezuela",
    date: "2019-04-30",
    year: 2019,
    verificationStatus: "verified",
    privacyLevel: "public",
    reporterProfile: "ex_political_prisoner",
    summary:
      "Ex preso político documenta condiciones de aislamiento y tortura psicológica en 'La Tumba' durante los eventos de abril 2019. Uno de los testimonios más detallados disponibles.",
    fullTestimony: `Testimonio completo disponible. Referenciado por ACNUDH en informe de julio 2019.`,
    aiAnalysis: {
      keywords: [
        "La Tumba",
        "SEBIN",
        "tortura psicológica",
        "aislamiento extremo",
        "abril 2019",
        "preso político",
        "ACNUDH",
      ],
      actorsMentioned: [
        "SEBIN",
        "director de La Tumba",
        "funcionarios de guardia",
      ],
      placesMentioned: [
        "La Tumba",
        "SEBIN Caracas",
        "Plaza Venezuela",
      ],
      possibleConnections: [
        "CAS-2019-235 — misma instalación, misma semana",
        "CAS-2019-236 — patrón sistemático La Tumba",
        "CAS-2018-089 — patrón continuado en La Tumba",
      ],
    },
    traceability: [
      {
        action: "Ingreso",
        actor: "Foro Penal Venezolano",
        date: "2019-06-15",
      },
      {
        action: "Verificado",
        actor: "Dr. R.A. — abogado defensor",
        date: "2019-07-01",
      },
      {
        action: "Citado en informe ACNUDH",
        actor: "ACNUDH",
        date: "2019-07-04",
      },
    ],
  },
  {
    id: "CAS-2018-078",
    title: "Exilio forzado de defensora de derechos humanos",
    type: "exilio",
    location: "Mérida",
    state: "Mérida",
    country: "Venezuela",
    date: "2018-09-03",
    year: 2018,
    verificationStatus: "verified",
    privacyLevel: "public",
    reporterProfile: "defender",
    summary:
      "Defensora de derechos humanos obligada a abandonar Venezuela tras amenazas directas contra ella y su familia. Documentó sus casos de exilio desde el exterior.",
    fullTestimony: `La defensora autoriza publicación de su testimonio completo como parte de su activismo desde el exilio.`,
    aiAnalysis: {
      keywords: [
        "exilio",
        "amenazas",
        "defensora DDHH",
        "Mérida",
        "familia en riesgo",
        "activismo",
      ],
      actorsMentioned: [
        "funcionarios no identificados",
        "grupos pro-gobierno locales",
      ],
      placesMentioned: ["Mérida", "Venezuela"],
      possibleConnections: [
        "CAS-2018-079 — defensora del mismo colectivo",
        "CAS-2018-056 — patrón amenazas a defensores en Mérida",
      ],
    },
    traceability: [
      {
        action: "Ingreso",
        actor: "Red de Defensores Venezuela",
        date: "2018-10-01",
      },
      {
        action: "Verificado",
        actor: "Coordinación regional",
        date: "2018-10-15",
      },
    ],
  },
  {
    id: "CAS-2017-445",
    title: "Detención masiva en protestas — Altamira, Caracas",
    type: "detencion_arbitraria",
    location: "Caracas",
    state: "Distrito Capital",
    country: "Venezuela",
    date: "2017-06-27",
    year: 2017,
    verificationStatus: "verified",
    privacyLevel: "public",
    reporterProfile: "witness",
    summary:
      "23 personas detenidas en Altamira durante la ola de protestas de 2017 y trasladadas a instalaciones militares. Testimonio colectivo de 8 sobrevivientes.",
    fullTestimony: `Testimonio colectivo de 8 personas. Uno de los casos más documentados de las protestas de 2017.`,
    aiAnalysis: {
      keywords: [
        "protestas 2017",
        "Altamira",
        "detención masiva",
        "instalaciones militares",
        "Caracas",
        "GNB",
        "colectivos",
      ],
      actorsMentioned: ["GNB", "colectivos pro-gobierno", "SEBIN"],
      placesMentioned: ["Altamira", "Caracas", "Distrito Capital"],
      possibleConnections: [
        "CAS-2017-446 — misma jornada, Chacao",
        "CAS-2017-447 — mismo operativo",
        "CAS-2017-312 — patrón coordinado, 2017",
      ],
    },
    traceability: [
      {
        action: "Ingreso",
        actor: "Foro Penal Venezolano",
        date: "2017-07-05",
      },
      {
        action: "Verificado",
        actor: "ONG aliada",
        date: "2017-07-15",
      },
      {
        action: "Referenciado — informe HRW",
        actor: "Human Rights Watch",
        date: "2017-08-01",
      },
    ],
  },
  {
    id: "CAS-2017-312",
    title: "Tortura en instalación militar — protestas 2017",
    type: "tortura",
    location: "Valencia",
    state: "Carabobo",
    country: "Venezuela",
    date: "2017-05-10",
    year: 2017,
    verificationStatus: "verified",
    privacyLevel: "anonymized",
    reporterProfile: "victim",
    summary:
      "Manifestante de 19 años sometido a tortura en instalación militar no identificada en Carabobo. Liberado tras 6 días sin cargos.",
    fullTestimony: `Testimonio reservado, disponible para investigadores acreditados previo protocolo de acceso.`,
    aiAnalysis: {
      keywords: [
        "protestas 2017",
        "tortura",
        "Carabobo",
        "instalación militar",
        "joven",
        "FANB",
      ],
      actorsMentioned: ["FANB", "funcionarios militares no identificados"],
      placesMentioned: ["Valencia", "Carabobo"],
      possibleConnections: ["CAS-2017-313", "CAS-2017-445"],
    },
    traceability: [
      {
        action: "Ingreso",
        actor: "ONG PROVEA",
        date: "2017-06-01",
      },
      {
        action: "Verificado — informe médico",
        actor: "Médico documentalista aliado",
        date: "2017-06-10",
      },
    ],
  },
  {
    id: "CAS-2016-034",
    title: "Censura y persecución a periodista independiente",
    type: "censura",
    location: "Caracas",
    state: "Distrito Capital",
    country: "Venezuela",
    date: "2016-11-14",
    year: 2016,
    verificationStatus: "verified",
    privacyLevel: "public",
    reporterProfile: "victim",
    summary:
      "Periodista objeto de acoso judicial y bloqueo de plataformas digitales tras publicar investigación sobre corrupción. Actualmente en el exilio.",
    fullTestimony: `Testimonio completo documentado. El periodista actualmente opera desde el exilio.`,
    aiAnalysis: {
      keywords: [
        "periodista",
        "censura",
        "acoso judicial",
        "investigación",
        "corrupción",
        "exilio",
        "CONATEL",
      ],
      actorsMentioned: ["CONATEL", "Fiscalía General", "SEBIN"],
      placesMentioned: ["Caracas"],
      possibleConnections: [
        "CAS-2016-035 — periodista del mismo medio, mismo período",
      ],
    },
    traceability: [
      {
        action: "Ingreso",
        actor: "IPYS Venezuela",
        date: "2016-12-01",
      },
      {
        action: "Verificado",
        actor: "Analista de medios",
        date: "2016-12-15",
      },
    ],
  },
  {
    id: "CAS-2014-089",
    title: "Represión de manifestaciones — inicio Operación La Salida",
    type: "detencion_arbitraria",
    location: "Caracas",
    state: "Distrito Capital",
    country: "Venezuela",
    date: "2014-02-12",
    year: 2014,
    verificationStatus: "verified",
    privacyLevel: "public",
    reporterProfile: "witness",
    summary:
      "Caso histórico fundacional. Primer episodio masivo de represión del período 2014-2024. Decenas de detenidos en las primeras 48 horas de 'La Salida'.",
    fullTestimony: `Caso histórico. Documentación completa archivada. Referenciado en múltiples informes internacionales.`,
    aiAnalysis: {
      keywords: [
        "La Salida",
        "2014",
        "represión",
        "manifestaciones",
        "Caracas",
        "caso histórico",
        "caso fundacional",
      ],
      actorsMentioned: [
        "GNB",
        "SEBIN",
        "colectivos armados",
        "PNB",
      ],
      placesMentioned: ["Caracas", "Chacao", "El Hatillo"],
      possibleConnections: [
        "CAS-2014-090",
        "CAS-2014-091",
      ],
    },
    traceability: [
      {
        action: "Ingreso — archivo histórico",
        actor: "Archivo fundacional del sistema",
        date: "2014-03-01",
      },
      {
        action: "Verificado",
        actor: "Investigador histórico",
        date: "2014-04-15",
      },
    ],
  },
];

// ─── Timeline Events ───────────────────────────────────────────────────────────

export type TimelineEventType =
  | "protest"
  | "detention"
  | "report"
  | "testimony"
  | "election"
  | "international"
  | "judicial"
  | "crisis";

export interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  month: string;
  title: string;
  description: string;
  type: TimelineEventType;
  location?: string;
  impact: "high" | "medium" | "low";
  sources?: string[];
  caseIds?: string[];
}

export const timelineEventTypeLabels: Record<TimelineEventType, string> = {
  protest: "Protesta",
  detention: "Represión",
  report: "Informe oficial",
  testimony: "Testimonio",
  election: "Electoral",
  international: "Internacional",
  judicial: "Judicial",
  crisis: "Crisis política",
};

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "TL-2014-001",
    date: "2014-02-12",
    year: 2014,
    month: "Feb 2014",
    title: 'Inicio de las protestas — "La Salida"',
    description:
      "Inicio de la ola de manifestaciones. La represión dejó decenas de heridos y detenidos en las primeras 48 horas. Puntos focales en Caracas, San Cristóbal y Mérida.",
    type: "protest",
    location: "Nacional",
    impact: "high",
    sources: ["Foro Penal Venezolano", "Human Rights Watch"],
    caseIds: ["CAS-2014-089"],
  },
  {
    id: "TL-2014-002",
    date: "2014-02-19",
    year: 2014,
    month: "Feb 2014",
    title: "Leopoldo López detenido por el SEBIN",
    description:
      "El líder opositor se entrega voluntariamente al SEBIN en Plaza Venezuela ante decenas de miles de simpatizantes. Inicia proceso de detención arbitraria que duraría años.",
    type: "detention",
    location: "Caracas",
    impact: "high",
    sources: ["Registro histórico público"],
  },
  {
    id: "TL-2015-001",
    date: "2015-12-06",
    year: 2015,
    month: "Dic 2015",
    title: "Elecciones parlamentarias — oposición gana supermayoría",
    description:
      "La Mesa de la Unidad Democrática obtiene supermayoría en la Asamblea Nacional. Inicia proceso sistemático de vaciamiento institucional del parlamento por el TSJ.",
    type: "election",
    location: "Nacional",
    impact: "high",
    sources: ["CNE", "Carter Center", "Unión Europea"],
  },
  {
    id: "TL-2016-001",
    date: "2016-05-15",
    year: 2016,
    month: "May 2016",
    title: "TSJ asume competencias de la Asamblea Nacional",
    description:
      "El Tribunal Supremo declara en desacato a la Asamblea Nacional y comienza a asumir sus funciones. Inicio de la destrucción sistemática del poder legislativo.",
    type: "judicial",
    location: "Caracas",
    impact: "high",
    sources: ["Sentencias TSJ", "Amnesty International"],
  },
  {
    id: "TL-2017-001",
    date: "2017-04-01",
    year: 2017,
    month: "Abr 2017",
    title: "Inicio de las protestas masivas de 2017",
    description:
      "Comienzan las manifestaciones más grandes desde 2014. Durante 120 días habrá protestas diarias. Al menos 157 personas fallecidas, más de 5.000 detenidas.",
    type: "protest",
    location: "Nacional",
    impact: "high",
    sources: ["Foro Penal Venezolano", "PROVEA", "Human Rights Watch"],
    caseIds: ["CAS-2017-445", "CAS-2017-312"],
  },
  {
    id: "TL-2017-002",
    date: "2017-07-30",
    year: 2017,
    month: "Jul 2017",
    title: "Elección de la Asamblea Nacional Constituyente",
    description:
      "El gobierno convoca y elige una ANC con poderes supraconstitucionales. La comunidad internacional desconoce el proceso. Profundización de la crisis institucional.",
    type: "election",
    location: "Nacional",
    impact: "high",
    sources: ["ANC", "OEA", "Unión Europea"],
  },
  {
    id: "TL-2017-003",
    date: "2017-08-01",
    year: 2017,
    month: "Ago 2017",
    title: 'Informe ACNUDH: "Represión de la disidencia en Venezuela"',
    description:
      "La Alta Comisionada de la ONU publica informe documentando tortura, uso excesivo de la fuerza y detenciones arbitrarias durante las protestas de 2017.",
    type: "report",
    location: "Internacional",
    impact: "high",
    sources: ["ACNUDH — Informe agosto 2017"],
  },
  {
    id: "TL-2018-001",
    date: "2018-05-20",
    year: 2018,
    month: "May 2018",
    title: "Reelección de Maduro — desconocida internacionalmente",
    description:
      "Maduro es reelecto en elecciones rechazadas por la mayoría de la comunidad internacional. Inicio del período de mayores sanciones internacionales.",
    type: "election",
    location: "Nacional",
    impact: "high",
    sources: ["CNE", "OEA", "Unión Europea"],
  },
  {
    id: "TL-2019-001",
    date: "2019-01-23",
    year: 2019,
    month: "Ene 2019",
    title: "Guaidó se proclama presidente interino",
    description:
      "Juan Guaidó se proclama presidente interino ante decenas de miles de venezolanos. Más de 50 países lo reconocen. Venezuela entra en crisis de dualidad de poder.",
    type: "crisis",
    location: "Caracas",
    impact: "high",
    sources: ["Asamblea Nacional", "Declaraciones internacionales"],
  },
  {
    id: "TL-2019-002",
    date: "2019-03-07",
    year: 2019,
    month: "Mar 2019",
    title: "Gran apagón nacional",
    description:
      "Venezuela sufre el mayor apagón de su historia. Hospitales sin electricidad, muertes documentadas por falla de equipos médicos. Crisis humanitaria agravada.",
    type: "crisis",
    location: "Nacional",
    impact: "high",
    sources: ["Observatorio Venezolano de Servicios Públicos"],
  },
  {
    id: "TL-2019-003",
    date: "2019-04-30",
    year: 2019,
    month: "Abr 2019",
    title: "Operación Libertad — represión masiva posterior",
    description:
      "Intento de alzamiento con militares disidentes. La represión de los días siguientes es brutal. SEBIN detiene a decenas de personas. Período más documentado de tortura en La Tumba.",
    type: "detention",
    location: "Caracas",
    impact: "high",
    sources: ["Foro Penal", "PROVEA", "ACNUDH"],
    caseIds: ["CAS-2019-234"],
  },
  {
    id: "TL-2020-001",
    date: "2020-01-15",
    year: 2020,
    month: "Ene 2020",
    title: "Operaciones FAES — patrón de ejecuciones documentado",
    description:
      "Las FAES intensifican operativos en barrios populares. La ACNUDH documenta patrón de ejecuciones extrajudiciales. Maracaibo, Caracas y La Guaira son focos principales.",
    type: "detention",
    location: "Nacional",
    impact: "high",
    sources: ["ACNUDH — Informe 2020", "Convite A.C."],
    caseIds: ["CAS-2021-023"],
  },
  {
    id: "TL-2020-002",
    date: "2020-03-16",
    year: 2020,
    month: "Mar 2020",
    title: "Cuarentena COVID-19 — detenciones arbitrarias",
    description:
      "El gobierno decreta cuarentena por COVID. Cientos de personas detenidas bajo argumento de violación de la cuarentena. Casos concentrados en estados fronterizos.",
    type: "detention",
    location: "Nacional",
    impact: "medium",
    sources: ["Foro Penal", "Convite A.C."],
    caseIds: ["CAS-2020-156"],
  },
  {
    id: "TL-2021-001",
    date: "2021-09-13",
    year: 2021,
    month: "Sep 2021",
    title: "Misión ONU: Crímenes de lesa humanidad documentados",
    description:
      "La Misión Internacional de Determinación de Hechos concluye que en Venezuela se cometieron crímenes de lesa humanidad. Identifica política de Estado para reprimir la disidencia.",
    type: "report",
    location: "Internacional",
    impact: "high",
    sources: ["ONU — Misión Internacional — A/HRC/48/69"],
  },
  {
    id: "TL-2022-001",
    date: "2022-11-26",
    year: 2022,
    month: "Nov 2022",
    title: "Negociaciones en Barbados",
    description:
      "Inicio de negociaciones entre el gobierno y la plataforma unitaria. Persisten detenciones y represión durante el período de diálogo.",
    type: "crisis",
    location: "Barbados",
    impact: "medium",
    sources: ["Plataforma Unitaria", "Gobierno de Venezuela", "Noruega"],
  },
  {
    id: "TL-2023-001",
    date: "2023-07-05",
    year: 2023,
    month: "Jul 2023",
    title: "Represión de manifestaciones estudiantiles en la UC",
    description:
      "Estudiantes de la Universidad de Carabobo son reprimidos durante manifestación. Varios detenidos, incluyendo el caso documentado CAS-2023-047.",
    type: "protest",
    location: "Valencia, Carabobo",
    impact: "medium",
    sources: ["OVCS", "Foro Penal"],
    caseIds: ["CAS-2023-047"],
  },
  {
    id: "TL-2024-001",
    date: "2024-07-28",
    year: 2024,
    month: "Jul 2024",
    title: "Elecciones presidenciales — disputa de resultados",
    description:
      "La oposición presenta actas que muestran victoria de Edmundo González. El CNE proclama a Maduro. Inicio de nueva ola represiva post-electoral.",
    type: "election",
    location: "Nacional",
    impact: "high",
    sources: ["CNE", "Plataforma Unitaria", "Carter Center", "OEA"],
  },
  {
    id: "TL-2024-002",
    date: "2024-07-29",
    year: 2024,
    month: "Jul 2024",
    title: "Crisis post-electoral — mayor represión desde 2017",
    description:
      "Manifestaciones reprimidas en todo el país. Más de 2.400 detenidos en las primeras semanas. Decenas de muertos. Período más intenso de represión documentado desde 2017.",
    type: "detention",
    location: "Nacional",
    impact: "high",
    sources: ["Foro Penal", "PROVEA", "ACNUDH"],
    caseIds: ["CAS-2024-001", "CAS-2024-002"],
  },
];

// ─── Network Graph Data ────────────────────────────────────────────────────────

export type NodeType = "actor" | "institution" | "location" | "event" | "testimony";

export interface NetworkNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  description: string;
  size: "sm" | "md" | "lg";
}

export interface NetworkEdge {
  source: string;
  target: string;
}

export const networkNodes: NetworkNode[] = [
  // Actors
  { id: "sebin",    label: "SEBIN",        type: "actor",       x: 148, y: 195, description: "Servicio Bolivariano de Inteligencia Nacional",               size: "lg" },
  { id: "faes",     label: "FAES",         type: "actor",       x: 148, y: 390, description: "Fuerzas de Acciones Especiales",                              size: "lg" },
  { id: "gnb",      label: "GNB",          type: "actor",       x: 65,  y: 292, description: "Guardia Nacional Bolivariana",                               size: "md" },
  { id: "pnb",      label: "PNB",          type: "actor",       x: 235, y: 292, description: "Policía Nacional Bolivariana",                               size: "md" },
  // Institutions
  { id: "minterior",label: "Min. Interior",type: "institution", x: 340, y: 130, description: "Ministerio del Interior y Justicia",                         size: "md" },
  { id: "fiscalia", label: "Fiscalía",     type: "institution", x: 492, y: 82,  description: "Ministerio Público / Fiscalía General",                      size: "md" },
  { id: "acnudh",   label: "ACNUDH",       type: "institution", x: 635, y: 60,  description: "Oficina del Alto Comisionado ONU para DDHH",                  size: "md" },
  { id: "mision",   label: "Misión ONU",   type: "institution", x: 782, y: 100, description: "Misión Internacional de Determinación de Hechos",            size: "md" },
  // Locations
  { id: "caracas",  label: "Caracas",      type: "location",    x: 548, y: 295, description: "Distrito Capital — centro principal de represión documentada",size: "lg" },
  { id: "maracaibo",label: "Maracaibo",    type: "location",    x: 448, y: 415, description: "Estado Zulia",                                               size: "md" },
  { id: "tachira",  label: "Táchira",      type: "location",    x: 375, y: 345, description: "Estado Táchira — zona fronteriza con alta represión",        size: "md" },
  { id: "carabobo", label: "Carabobo",     type: "location",    x: 615, y: 415, description: "Estado Carabobo",                                            size: "md" },
  // Events
  { id: "prot2017", label: "Protestas '17",type: "event",       x: 752, y: 255, description: "120 días de protestas · 157 fallecidos · +5.000 detenidos", size: "lg" },
  { id: "tuntun",   label: "Op. Tun Tun",  type: "event",       x: 852, y: 400, description: "Operaciones FAES 2019-2020 · Ejecuciones extrajudiciales",   size: "md" },
  { id: "anc2017",  label: "ANC 2017",     type: "event",       x: 845, y: 162, description: "Asamblea Nacional Constituyente — crisis institucional",     size: "md" },
  { id: "crisis19", label: "Crisis 2019",  type: "event",       x: 955, y: 292, description: "Dualidad de poder · Operación Libertad · La Tumba",         size: "md" },
  // Testimonies
  { id: "cas001",   label: "CAS-2024-001", type: "testimony",   x: 1068,y: 205, description: "Detención arbitraria · Caracas · 2024",                     size: "sm" },
  { id: "cas002",   label: "CAS-2024-002", type: "testimony",   x: 1078,y: 320, description: "Tortura · Maracaibo · 2024",                                size: "sm" },
  { id: "cas047",   label: "CAS-2023-047", type: "testimony",   x: 1068,y: 440, description: "Desaparición forzada · Valencia · 2023",                    size: "sm" },
];

export const networkEdges: NetworkEdge[] = [
  { source: "sebin",    target: "minterior" },
  { source: "faes",     target: "minterior" },
  { source: "gnb",      target: "minterior" },
  { source: "pnb",      target: "minterior" },
  { source: "sebin",    target: "caracas"   },
  { source: "sebin",    target: "tachira"   },
  { source: "sebin",    target: "prot2017"  },
  { source: "sebin",    target: "cas001"    },
  { source: "faes",     target: "caracas"   },
  { source: "faes",     target: "maracaibo" },
  { source: "faes",     target: "tuntun"    },
  { source: "faes",     target: "cas002"    },
  { source: "gnb",      target: "caracas"   },
  { source: "gnb",      target: "tachira"   },
  { source: "gnb",      target: "prot2017"  },
  { source: "pnb",      target: "caracas"   },
  { source: "fiscalia", target: "prot2017"  },
  { source: "fiscalia", target: "tuntun"    },
  { source: "acnudh",   target: "prot2017"  },
  { source: "acnudh",   target: "anc2017"   },
  { source: "acnudh",   target: "tuntun"    },
  { source: "mision",   target: "crisis19"  },
  { source: "mision",   target: "tuntun"    },
  { source: "prot2017", target: "caracas"   },
  { source: "prot2017", target: "tachira"   },
  { source: "prot2017", target: "carabobo"  },
  { source: "tuntun",   target: "caracas"   },
  { source: "tuntun",   target: "maracaibo" },
  { source: "tuntun",   target: "cas047"    },
  { source: "anc2017",  target: "caracas"   },
  { source: "crisis19", target: "caracas"   },
  { source: "cas001",   target: "caracas"   },
  { source: "cas002",   target: "maracaibo" },
  { source: "cas047",   target: "carabobo"  },
];

// ─── Dashboard Stats ───────────────────────────────────────────────────────────

export const dashboardStats = {
  testimonios: 4847,
  documentos: 23412,
  casosVerificados: 892,
  patronesDetectados: 156,
};
