import { productVisionApi } from "../utils/api";

export const documentService = {
  generateDocuments: async (idea, domain) => {
    try {
      const response = await productVisionApi.post("/user-input", {
        idea,
        domain,
      });

      if (response.status !== 201) {
        throw new Error("Failed to generate documents");
      }

      return response.data; // Contains the ID we'll use for subsequent requests
    } catch (error) {
      console.error("Error generating documents:", error);
      throw error;
    }
  },

  fetchDocument: async (type, userId) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await productVisionApi.get(
        `/generate-document/${type}/${userId}`
      );

      if (response.status !== 200) {
        throw new Error(`Failed to fetch ${type} document`);
      }

      // Clean up the response by removing special characters
      const cleanDocument = response.data.document
        .replaceAll("*", "")
        .replaceAll("#", "")
        .trim();

      return {
        ...response.data,
        document: cleanDocument,
      };
    } catch (error) {
      console.error(`Error fetching ${type} document:`, error);
      throw error;
    }
  },

  reviseDocument: async (type, userId, revisionPrompt) => {
    if (!userId || !revisionPrompt) {
      throw new Error("User ID and revision prompt are required");
    }

    try {
      const response = await productVisionApi.post(
        `/revise-document/${type}/${userId}`,
        { revisionPrompt }
      );

      if (response.status !== 200) {
        throw new Error(`Failed to revise ${type} document`);
      }

      console.log(response.data);

      // Clean up the response by removing special characters
      const cleanDocument = response.data.document
        .replaceAll("*", "")
        .replaceAll("#", "")
        .trim();

      return {
        ...response.data,
        document: cleanDocument,
      };
    } catch (error) {
      console.error(`Error revising ${type} document:`, error);
      throw error;
    }
  },

  // Added RFP generation function
  generateRfp: async (userId) => {
    if (!userId) {
      throw new Error("User ID is required for RFP generation");
    }

    try {
      const response = await productVisionApi.post(
        `/generate-rfp/${userId}`,
        {},
        {
          // headers: {
          //   Accept: "application/pdf",
          // },
          responseType: "json",
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to generate RFP");
      }

      const cleanDocument = response.data.document
        .replaceAll("*", "") // Remove all asterisks
        .replaceAll("#", "") // Remove all hash symbols
        .trim(); // Remove any leading/trailing whitespace

      console.log("Cleaned Document:", cleanDocument);

      // Attempt to parse the cleaned document if it is valid JSON
      // try {
      //   const parsedDocument = JSON.parse(cleanDocument);
      //   console.log("Parsed Document:", parsedDocument.document);
      //   // console.log(parsedDocument.message);
      //   return parsedDocument.data.document;
      // } catch (error) {
      //   console.error("Error parsing JSON:", error);
      // }
      console.log(typeof cleanDocument);
      return cleanDocument;
    } catch (error) {
      console.error("Error generating RFP:", error);
      throw error;
    }
  },
};

export default documentService;
