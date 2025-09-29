import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"



import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { entityConfigs } from "@/lib/filter/utils"
import { usePathname } from "next/navigation"
import { useState } from "react"

const formSchema = z.object({
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
})

type FormData = z.infer<typeof formSchema>

export function ItemsFilter() {

  const [dictionaries, setDictionaries] = useState({
    collections: [],
    degree_of_wear: [],
    rarity: [],
    type_of_objects: [],
    type_of_weapons: [],
    tournaments: [],
    professional_players: [],
    teams: [],
    type_of_materials: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pathname = usePathname()
  const entityType = pathname.split("/")[2]
  const config = (entityConfigs as any)[entityType]

  const form = useForm<FormData>({
    resolver: zodResolver(config.schema),
    defaultValues: config.defaultValues,
  })

  const floatValue = form.watch("float");
  const nameValue = form.watch("name");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // const dictionaries = new Dictionaries()
      // await dictionaries.create(entityType, data)
      // Reset form after successful submission
      form.reset()
      console.log(data)
      alert("Form submitted successfully!")
    } catch (error) {
      console.error("Submission error:", error)
      alert("Error submitting form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Фильтр</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 pr-4 max-h-150 overflow-auto">
          <Form {...form}>
                <form
                  id="filter"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {(entityConfigs as any)[entityType].fields.map((field) =>
                    field.type === "select" ? (
                      <FormField
                        key={field.name + 'select'}
                        control={form.control}
                        name={field.name}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormLabel>{field.label}</FormLabel>
                            <Select
                              disabled={
                                field.name === 'degree_of_wear' ||
                                field.name === 'type_of_weapons' && !!nameValue || 
                                field.name === 'type_of_objects' && !!nameValue
                              }
                              onValueChange={(val) => f.onChange(val)}
                              value={f.value}
                              defaultValue={f.value}
                            >
                              <FormControl>
                                <SelectTrigger className={`w-full border-2`}>
                                  <SelectValue
                                    placeholder={`Выберите ${field.label.toLowerCase()}`}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {(dictionaries[field.optionsKey] || []).map(
                                  (option) => (
                                    <SelectItem
                                      // className = {}
                                      key={option.id + 'selectasdf'}
                                      value={String(option.id)}
                                    >
                                      {option.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : field.type === "text" ? (
                      <FormField
                        key={field.name + 'text'}
                        control={form.control}
                        name={field.name}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormLabel>{field.label}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите название"
                                {...field}
                                onChange={f.onChange}
                              />
                            </FormControl>
                            <FormDescription>
                              {field.decription}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : field.type === "number" ? (
                      <FormField
                        control={form.control}
                        name={field.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Float</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                max={1}
                                step="any"
                                placeholder="Введите float"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? ""
                                      : Number(e.target.value)
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Число с плавающей точкой (от 0.00000000000001 до
                              100)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : field.type === "checkbox" ? (
                      <FormField
                        control={form.control}
                        name={field.name}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>StarTrack</FormLabel>
                              <FormDescription>
                                Предметы StarTrack дороже и имеют специальную
                                пометку на оружии
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    ) : null
                  )}
                </form>
              </Form>
            </div>
            <div className="flex gap-4 pt-6">
               <Button
                 form="filter"
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-1"
               >
                 {isSubmitting ? "Филтрация..." : "Применить"}
               </Button>
               <Button
                 type="button"
                 variant="outline"
                 onClick={() => {
                   form.reset()
                 }}
                 disabled={isSubmitting}
               >
                 Сбросить
               </Button>
            </div>
      </CardContent>
    </Card>
  )
}
