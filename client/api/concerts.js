const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;

const findAllQuery = `
    query Concerts {
        concerts {
            id
            title
            city
            month
            year
            price
            artist {
                id
                artistname
            }
            genres {
                id
                label
            }
        }
    }`;

const findByIdQuery = (id) => `
    query Concert {
        concert(id: ${id}) {
            id
            title
            city
            month
            year
            price
            artist {
                id
                artistname
            }
            genres {
                label
                id
            }
        }
    }`;

const createQuery = (concert) => `
    mutation CreateConcert {
        createConcert(
            title: ${concert.title}
            city: ${concert.city}
            month: ${concert.month}
            year: ${concert.year}
            price: ${concert.price}
            artistid: ${concert.artistid}
        ) {
            id
            title
            city
            month
            year
            price
        }
    }`;

const deleteByIdQuery = (id) => `
    mutation DeleteConcert {
        deleteConcert(id: ${id}) {
            id
            title
            city
            month
            year
            price
        }
    }`;

const updateQuery = (concert) => `
    mutation UpdateConcert {
        updateConcert(
            id: ${concert.id}
            title: ${concert.title}
            city: ${concert.city}
            month: ${concert.month}
            year: ${concert.year}
            price: ${concert.price}
            artistid: ${concert.artistid}
        ) {
            id
            title
            city
            month
            year
            price
        }
    }`;

const addGenreQuery = (concertId, genreId) => `
    mutation AddGenreToConcert {
        addGenreToConcert(
            concertid: ${concertId}, 
            genreid: ${genreId}) {
                concertid
                genreid
            }
        )
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
      
      return data.data.concerts;
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
      return data.data.book;
    } catch (error) {
      throw error;
    }
  },
  create: async (book) => {
    try {
      const response = await fetch(
        graphqlEndpoint,
        requestOptions(createQuery(book))
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data.createBook;
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
  update: async (book) => {
    try {
      const response = await fetch(
        graphqlEndpoint,
        requestOptions(updateQuery(book))
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data.updateBook;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = api;