import { render, screen } from "@testing-library/react";
import rootReducer from "./reducers/index";
import store from "./store/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Form from "./components/Form/Form";


test("Debe devolver el estado inicial", () => {
  expect(rootReducer(undefined, [])).toEqual({
    videogames: [],
    allVideoGames: [],
    genres: [],
    platforms: [],
    details: [],
    see: []
  });
});


// describe("Form", () => {
//   beforeEach(() => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Form />
//         </BrowserRouter>
//       </Provider>
//     );
//   });

//   it("Debería renderizar un form", () => {
//     expect(Form.find("form")).toHaveLength(1);
//   });

  // it("El formulario debe tener un input para poner el Nombre de un Videogame", () => {
  //   const element = screen.getByLabelText("Nombre");
  //   expect(element.type).toBe("text");
  // });
  // it("El formulario debe tener un input para poner una Descripción", () => {
  //   const element = screen.getByLabelText("Description");
  //   expect(element.type).toBe("text");
  // });

