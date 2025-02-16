"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTheme } from "./theme-provider";

interface Collaborator {
  _id: string;
  name: string;
}

interface Journey {
  _id: string;
  name: string;
}

interface JourneyExecution {
  _id: string;
  journeyId: string;
  collaboratorId: string;
  startDate: string;
  status: "scheduled" | "in_progress" | "completed" | "failed";
  currentActionIndex: number;
}

interface JourneyExecutionFormInputs {
  journeyId: string;
  collaboratorId: string;
  startDate: string;
}

export default function JourneyExecution() {
  const [executions, setExecutions] = useState<JourneyExecution[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const { register, handleSubmit, setValue, reset } = useForm<JourneyExecutionFormInputs>();

  const { theme } = useTheme();

  useEffect(() => {
    fetchExecutions();
    fetchCollaborators();
    fetchJourneys();
  }, []);

  const fetchExecutions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/journey-executions`);
      const data = await response.json();
      setExecutions(data.data);
    } catch (error) {
      console.error("Error fetching journey executions:", error);
    }
  };

  const fetchCollaborators = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/collaborators`);
      const data = await response.json();
      setCollaborators(data.data);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };

  const fetchJourneys = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/journeys`);
      const data = await response.json();
      setJourneys(data.data);
    } catch (error) {
      console.error("Error fetching journeys:", error);
    }
  };

  const onSubmit: SubmitHandler<JourneyExecutionFormInputs> = async (formData) => {
    try {
      const formattedData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/journey-executions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      console.log("🚀 ~ constonSubmit:SubmitHandler<JourneyExecutionFormInputs>= ~ formattedData:", formattedData);

      if (response.ok) {
        reset();
        fetchExecutions();
      }
    } catch (error) {
      console.error("Error creating journey execution:", error);
    }
  };

  const getStatusLabel = (status: "scheduled" | "in_progress" | "completed" | "failed"): string => {
    switch (status) {
      case "scheduled":
        return "Agendado";
      case "in_progress":
        return "Em Progresso";
      case "completed":
        return "Concluído";
      case "failed":
        return "Falhou";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Execução da Jornada</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-4">
        <Select onValueChange={(value) => setValue("collaboratorId", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o Colaborador" />
          </SelectTrigger>
          <SelectContent>
            {collaborators.map((collaborator) => (
              <SelectItem key={collaborator._id} value={collaborator._id}>
                {collaborator.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setValue("journeyId", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a Jornada" />
          </SelectTrigger>
          <SelectContent>
            {journeys.map((journey) => (
              <SelectItem key={journey._id} value={journey._id}>
                {journey.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          type="datetime-local"
          {...register("startDate", { required: true })}
          className={`w-full p-2 border rounded ${theme === "dark" ? "bg-background" : "bg-background"}`}
        />
        <Button type="submit">Iniciar Execução da Jornada</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Jornada</TableHead>
            <TableHead>Colaborador</TableHead>
            <TableHead>Data de Início</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ação Atual</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {executions.map((execution) => (
            <TableRow key={execution._id}>
              <TableCell>{journeys.find((j) => j._id === execution.journeyId)?.name}</TableCell>
              <TableCell>{collaborators.find((c) => c._id === execution.collaboratorId)?.name}</TableCell>
              <TableCell>{new Date(execution.startDate).toLocaleString()}</TableCell>
              <TableCell>{getStatusLabel(execution.status)}</TableCell>
              <TableCell>{execution.currentActionIndex + 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
