import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollaboratorManagement from "@/components/CollaboratorManagement";
import JourneyManagement from "@/components/JourneyManagement";
import JourneyExecution from "@/components/JourneyExecution";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Tabs defaultValue="collaborators">
        <TabsList>
          <TabsTrigger value="collaborators">Colaboradores</TabsTrigger>
          <TabsTrigger value="journeys">Jornadas</TabsTrigger>
          <TabsTrigger value="executions">Execuções de Jornada</TabsTrigger>
        </TabsList>
        <TabsContent value="collaborators">
          <CollaboratorManagement />
        </TabsContent>
        <TabsContent value="journeys">
          <JourneyManagement />
        </TabsContent>
        <TabsContent value="executions">
          <JourneyExecution />
        </TabsContent>
      </Tabs>
    </div>
  );
}
