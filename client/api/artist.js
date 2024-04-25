const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;

const findAllQuery = `
    query Artists {
        artists {
            id
            artistname
        }
    }`;

const findByIdQuery = (id) => `
    query Artist {
        artist(id: "${id}") {
            id
            artistname
        }
    }`;

const createQuery = (artist) => `
    mutation CreateArtist {
        createArtist(artistname: "${artist.artistname}") {
            id
            artistname
        }
    }`;

const deleteByIdQuery = (id) => `
    mutation DeleteArtist {
        deleteArtist(id: "${id}") {
            id
            artistname
        }
    }`;

const updateQuery = (artist) => `
    mutation UpdateArtist {
        updateArtist(id: "${artist.id}", artistname: "${artist.artistname}") {
            id
            artistname
        }
    }`;

const requestOptions = (graphqlQuery) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: graphqlQuery }),
});

const api = {
  findAll: async () => {
    try {
      const response = await fetch(
        graphqlEndpoint,
        requestOptions(findAllQuery)
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data.artists;
    } catch (error) {
      throw error;
    }
  },
  findById: async (id) => {
    try {
      const response = await fetch(
        graphqlEndpoint,
        requestOptions(findByIdQuery(id))
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data.artist;
    } catch (error) {
      throw error;
    }
  },
  create: async (artist) => {
    try {
      const response = await fetch(
        graphqlEndpoint,
        requestOptions(createQuery(artist))
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data.createArtist;
    } catch (error) {
      throw error;
    }
  },
  deleteById: async (id) => {
    try {
      const response = await fetch(
        graphqlEndpoint,
        requestOptions(deleteByIdQuery(id))
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      throw error;
    }
  },
  update: async (artist) => {
    try {
      const response = await fetch(
        graphqlEndpoint,
        requestOptions(updateQuery(artist))
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data.updateArtist;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = api;
