import Header from "./components/Header";
import Navbar from "./components/Navbar";
import NavbarMenu from "./components/NavbarMenu";
import CardOptions from "./components/CardOptions";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import AddProjectModal from "./components/AddProjectModal";
import ConfirmationDialog from "./components/ConfirmationDialog";
import ModalSuceed from "./components/ModalSuceed";
import Container from "./components/Container";
import Card from "./components/Card";
import Table from "./components/Table";
import StateProvider from "./providers/AppContext";
import QueryProvider from "./providers/QueryProvider";

function App() {
  return (
    <>
      <StateProvider>
        <Header />
        <Navbar />
        <QueryProvider>
          <Container>
            <Card />
            <NavbarMenu />
            <Table />
          </Container>
          <CardOptions />
          <AddModal />
          <EditModal />
          <AddProjectModal />
          <ConfirmationDialog />
        </QueryProvider>
        <ModalSuceed />
      </StateProvider>
    </>
  );
}

export default App;
