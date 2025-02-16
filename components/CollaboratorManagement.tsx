"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Collaborator {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface CollaboratorFormInputs {
  name: string;
  email: string;
  phone: string;
}

export default function CollaboratorManagement() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const { register, handleSubmit, reset } = useForm<CollaboratorFormInputs>();

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const fetchCollaborators = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/collaborators`);
      const data = await response.json();
      setCollaborators(data.data);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    }
  };

  const onSubmit: SubmitHandler<CollaboratorFormInputs> = async (formData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/collaborators`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        reset();
        fetchCollaborators();
      }
    } catch (error) {
      console.error("Erro ao criar colaborador:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Gerenciamento de Colaboradores</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-4">
        <Input type="text" placeholder="Nome" {...register("name", { required: true })} />
        <Input type="email" placeholder="Email" {...register("email", { required: true })} />
        <Input type="tel" placeholder="Telefone" {...register("phone", { required: true })} />
        <Button type="submit">Adicionar Colaborador</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collaborators.map((collaborator) => (
            <TableRow key={collaborator._id}>
              <TableCell>{collaborator.name}</TableCell>
              <TableCell>{collaborator.email}</TableCell>
              <TableCell>{collaborator.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
