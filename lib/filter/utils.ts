import * as z from "zod";

export const entityConfigs = {
  containers: {
    schema: z.object({
      name: z
        .string()
        .min(2, "Название должно содержать минимум 2 символа")
        .max(100, "Название не должно превышать 100 символов"),
      collection: z.string().min(1, "Пожалуйста, выберите коллекцию"),
      tournaments: z.string().min(1, "Пожалуйста, выберите турнир"),
    }),
    fields: [
      {
        name: "name",
        label: "Название кейса",
        type: "text",
        decription: "Название предмета (2-100 символов)",
      },
      {
        name: "collection",
        label: "Коллекция",
        type: "select",
        optionsKey: "collections",
      },
      {
        name: "tournaments",
        label: "Название турнир",
        type: "select",
        optionsKey: "tournaments",
      },
    ],
    defaultValues: {
      name: "",
      collection: "",
      tournaments: "",
    },
  },
  agency: {
    schema: z.object({
      name: z
        .string()
        .min(2, "Название должно содержать минимум 2 символа")
        .max(100, "Название не должно превышать 100 символов"),
      collection: z.string().min(1, "Пожалуйста, выберите коллекцию"),
    }),
    fields: [
      {
        name: "name",
        label: "Название кейса",
        type: "text",
        decription: "Название предмета (2-100 символов)",
      },
      {
        name: "collection",
        label: "Коллекция",
        type: "select",
        optionsKey: "collections",
      },
    ],
    defaultValues: {
      name: "",
      collection: "",
    },
  },
  weapons: {
    schema: z.object({
      name: z
        .string()
        .min(2, "Название должно содержать минимум 2 символа")
        .max(100, "Название не должно превышать 100 символов"),
      float: z
        .number()
        .min(0.00000000000001, "Float должен быть не меньше 0.00000000000001")
        .max(100, "Float должен быть меньше 100"),
      isStarTrack: z.boolean().default(false),
      degree_of_wear: z.string().min(1, "Пожалуйста, выберите степень износа"),
      collection: z.string().min(1, "Пожалуйста, выберите коллекцию"),
      rarity: z.string().min(1, "Пожалуйста, выберите редкость"),
      type_of_objects: z.string().min(1, "Пожалуйста, выберите тип предмета"),
      type_of_weapons: z.string().min(1, "Пожалуйста, выберите тип оружия"),
      tournaments: z.string().min(1, "Пожалуйста, выберите турнир"),
    }),
    fields: [
      {
        name: "name",
        label: "Название оружия",
        type: "text",
        decription: "Название предмета (2-100 символов)",
      },
      { name: "float", label: "Дата", type: "number", max: 1 },
      { name: "isStarTrack", label: "Дата", type: "checkbox" },
      {
        name: "collection",
        label: "Коллекция",
        type: "select",
        optionsKey: "collections",
      },
      {
        name: "degree_of_wear",
        label: "Степень износа",
        type: "select",
        optionsKey: "degree_of_wear",
      },
      {
        name: "rarity",
        label: "Редкость",
        type: "select",
        optionsKey: "rarity",
      },
      {
        name: "type_of_objects",
        label: "Тип объекта",
        type: "select",
        optionsKey: "type_of_objects",
      },
      {
        name: "type_of_weapons",
        label: "Оружие",
        type: "select",
        optionsKey: "type_of_weapons",
      },
      {
        name: "tournaments",
        label: "Название турнир",
        type: "select",
        optionsKey: "tournaments",
      },
    ],
    defaultValues: {
      name: "",
      float: 0,
      isStarTrack: false,
      degree_of_wear: "",
      collection: "",
      rarity: "",
      type_of_objects: "",
      type_of_weapons: "",
      tournaments: "",
    },
  },
  stickers: {
    schema: z.object({
      name: z
        .string()
        .min(2, "Название должно содержать минимум 2 символа")
        .max(100, "Название не должно превышать 100 символов"),
      professional_player: z
        .string()
        .min(1, "Пожалуйста, выберите профессионального игрока"),
      tournaments: z.string().min(1, "Пожалуйста, выберите турнир"),
      rarity: z.string().min(1, "Пожалуйста, выберите редкость"),
      collection: z.string().min(1, "Пожалуйста, выберите коллекцию"),
      team: z.string().min(1, "Пожалуйста, выберите команду"),
      type_of_material: z.string().min(1, "Пожалуйста, выберите тип мфтериала"),
      type_of_objects: z.string().min(1, "Пожалуйста, выберите тип предмета"),
    }),
    fields: [
      {
        name: "name",
        label: "Название стикера",
        type: "text",
        decription: "Название предмета (2-100 символов)",
      },
      {
        name: "professional_players",
        label: "Профессиональный игрок",
        type: "select",
        optionsKey: "professional_players",
      },
      {
        name: "tournaments",
        label: "Название турнира",
        type: "select",
        optionsKey: "tournaments",
      },
      {
        name: "rarity",
        label: "Редкость",
        type: "select",
        optionsKey: "rarity",
      },
      {
        name: "collection",
        label: "Коллекция",
        type: "select",
        optionsKey: "collections",
      },
      { name: "teams", label: "Команда", type: "select", optionsKey: "teams" },
      {
        name: "type_of_materials",
        label: "Тип материала",
        type: "select",
        optionsKey: "type_of_materials",
      },
      {
        name: "type_of_objects",
        label: "Тип прдемета",
        type: "select",
        optionsKey: "type_of_objects",
      },
    ],
    defaultValues: {
      name: "",
      professional_palyer: "",
      tournaments: "",
      rarity: "",
      collection: "",
      team: "",
      type_of_material: "",
      type_of_objects: "",
    },
  },
  items: {
    schema: z.object({
      name: z
        .string()
        .min(2, "Название должно содержать минимум 2 символа")
        .max(100, "Название не должно превышать 100 символов")
        .optional()
        .or(z.literal("")),

      float: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z
          .number()
          .min(0.00000000000001, "Float должен быть не меньше 0.00000000000001")
          .max(100, "Float должен быть меньше 100")
          .optional()
      ),

      isStarTrack: z.boolean().default(false).optional(),

      degree_of_wear: z
        .string()
        .min(1, "Пожалуйста, выберите степень износа")
        .optional()
        .or(z.literal("")),
      collection: z
        .string()
        .min(1, "Пожалуйста, выберите коллекцию")
        .optional()
        .or(z.literal("")),
      rarity: z
        .string()
        .min(1, "Пожалуйста, выберите редкость")
        .optional()
        .or(z.literal("")),
      type_of_objects: z
        .string()
        .min(1, "Пожалуйста, выберите тип предмета")
        .optional()
        .or(z.literal("")),
      type_of_weapons: z
        .string()
        .min(1, "Пожалуйста, выберите тип оружия")
        .optional()
        .or(z.literal("")),
      tournaments: z
        .string()
        .min(1, "Пожалуйста, выберите турнир")
        .optional()
        .or(z.literal("")),
      team: z
        .string()
        .min(1, "Пожалуйста, выберите команду")
        .optional()
        .or(z.literal("")),
      type_of_material: z
        .string()
        .min(1, "Пожалуйста, выберите тип материала")
        .optional()
        .or(z.literal("")),
    }),
    fields: [
      {
        name: "name",
        label: "Название оружия",
        type: "text",
        decription: "Название предмета (2-100 символов)",
      },
      {
        name: "collection",
        label: "Коллекция",
        type: "select",
        optionsKey: "collections",
      },
      {
        name: "degree_of_wear",
        label: "Степень износа",
        type: "select",
        optionsKey: "degree_of_wear",
      },
      {
        name: "rarity",
        label: "Редкость",
        type: "select",
        optionsKey: "rarity",
      },
      {
        name: "type_of_objects",
        label: "Тип объекта",
        type: "select",
        optionsKey: "type_of_objects",
      },
      {
        name: "type_of_weapons",
        label: "Оружие",
        type: "select",
        optionsKey: "type_of_weapons",
      },
      {
        name: "tournaments",
        label: "Название турнир",
        type: "select",
        optionsKey: "tournaments",
      },
      { name: "teams", label: "Команда", type: "select", optionsKey: "teams" },
      {
        name: "type_of_materials",
        label: "Тип материала",
        type: "select",
        optionsKey: "type_of_materials",
      },
      { name: "isStarTrack", label: "Дата", type: "checkbox" },
      { name: "float", label: "Дата", type: "number", max: 1 },
    ],
    defaultValues: {
      name: "",
      isStarTrack: false,
      degree_of_wear: "",
      collection: "",
      rarity: "",
      type_of_objects: "",
      type_of_weapons: "",
      tournaments: "",
      team: "",
      type_of_material: "",
      float: 1,
    },
  },
  // ...другие сущности
};
