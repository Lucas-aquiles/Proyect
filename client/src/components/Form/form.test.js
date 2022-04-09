import Form from "./Form"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store/index";
import { render, screen } from "@testing-library/react";



describe("Form", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Form />
                </BrowserRouter>
            </Provider>
        );
    });

    it("Debería renderizar un form", () => {

        const element = screen.getByLabelText("Nombre:", { selector: 'input' });
        expect(element.type).toBe("text");

    });

    it('Debería renderizar un label con el texto Description:"', () => {

        const element = screen.getByLabelText("Description:")
        expect(element.type).toBe("textarea");
    });
    it("El formulario debe tener un input para poner Rating:", () => {
        const element = screen.getByLabelText("Rating:");
        expect(element.type).toBe("number");
    });
    it("El formulario debe tener un input para poner Released::", () => {
        const element = screen.getByLabelText("Released:");
        expect(element.type).toBe("text");
    });

});

