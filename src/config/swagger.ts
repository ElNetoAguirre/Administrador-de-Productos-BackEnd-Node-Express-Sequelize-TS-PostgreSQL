import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products"
      }
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for Products"
    }
  },
  apis: ["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
  customCss: `
    .swagger-ui .topbar{
      background-color: #2b3b45;
    }
    .swagger-ui .topbar a {
      max-width: 80px;
    }
    .topbar-wrapper .link {
      content: url("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/HAL9000.svg/1200px-HAL9000.svg.png");
      height: 80px;
      width: auto;
    }
  `,
  customSiteTitle: "Documentación REST API Express / TypeScript",
  customfavIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/HAL9000.svg/1200px-HAL9000.svg.png",
}

export default swaggerSpec

export {
  swaggerUiOptions
}