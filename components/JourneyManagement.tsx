"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Journey {
  _id: string;
  name: string;
  description: string;
  actions: {
    type: string;
    config: {
      template: string;
    };
    order: number;
  }[];
}

interface JourneyFormInputs {
  name: string;
  description: string;
  actions: {
    type: string;
    config: {
      template: string;
    };
    order: number;
  }[];
}

export default function JourneyManagement() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const { register, control, handleSubmit, reset } = useForm<JourneyFormInputs>({
    defaultValues: {
      actions: [
        { type: "email", config: { template: "" }, order: 1 },
        { type: "whatsapp", config: { template: "" }, order: 2 },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "actions",
  });

  useEffect(() => {
    fetchJourneys();
  }, []);

  // como foi em tempo record kk, eu colocaria todas as funções de fetch em um arquivo separado, para reutilização e utilizaria o axios para fazer as requisições
  // poderia utilizar um react-query para fazer o fetch dos dados e manter o cache atualizado
  const fetchJourneys = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/journeys`);
      const data = await response.json();
      setJourneys(data.data);
    } catch (error) {
      console.error("Error fetching journeys:", error);
    }
  };

  const onSubmit: SubmitHandler<JourneyFormInputs> = async (formData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/journeys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        reset();
        fetchJourneys();
      }
    } catch (error) {
      console.error("Error creating journey:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Gerenciamento de Jornada</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-4">
        <Input type="text" placeholder="Nome da Jornada" {...register("name", { required: true })} />
        <Textarea placeholder="Descrição da Jornada" {...register("description", { required: true })} />
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <Input
              type="text"
              placeholder={`Tipo de Ação ${index + 1}`}
              {...register(`actions.${index}.type` as const, { required: true })}
              readOnly
            />
            <Input
              type="text"
              placeholder={`Template de Ação ${index + 1}`}
              {...register(`actions.${index}.config.template` as const, { required: true })}
            />
          </div>
        ))}
        <Button type="submit">Adicionar Jornada</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {journeys.map((journey) => (
            <TableRow key={journey._id}>
              <TableCell>{journey.name}</TableCell>
              <TableCell>{journey.description}</TableCell>
              <TableCell>
                {journey.actions.map((action, index) => (
                  <div key={index}>
                    {action.type}: {action.config.template}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
