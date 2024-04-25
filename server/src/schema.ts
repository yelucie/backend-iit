import { makeExecutableSchema } from '@graphql-tools/schema'
import { context } from './context'

export const typeDefs = `
    type Artist {
        id: ID!
        artistname: String!
        concerts: [Concert]!
    }

    type Concert {
        id: ID!
        title: String!
        city: String!
        date: String!
        price: Float!
        artist: Artist!
        genres: [Genre]
    }

    type Genre {
        id: ID!
        label: String!
        concerts: [ConcertGenre]!
    }

    type ConcertGenre {
        concertid: ID!
        genreid: ID!
    }

    type Query {
        artists: [Artist]
        artist(id: ID!): Artist
        concerts: [Concert]
        concert(id: ID!): Concert
        genres: [Genre]
        genre(id: ID!): Genre
    }

    type Mutation {
        createArtist(artistname: String!): Artist
        createConcert(title: String!, city: String!, date: String!, price: Float!, artistid: ID!): Concert
        createGenre(label: String!): Genre
        addGenreToConcert(concertid: String, genreid: String): ConcertGenre
        deleteArtist(id: ID!): Artist
        deleteConcert(id: ID!): Concert
        deleteGenre(id: ID!): Genre
        deleteGenreFromConcert(concertid: ID, genreid: ID): ConcertGenre
        updateArtist(id: ID!, artistname: String): Artist
        updateConcert(id: ID!, title: String, city: String, date: String, price: Float, artistid: ID): Concert
        updateGenre(id: ID!, label: String): Genre
        updateGenreFromConcert(concertid: ID!, genreid: ID!): ConcertGenre
    }
`

export const resolvers = {
    Query: {
        artists: async() => {
            return context.prisma.artist.findMany({});
        },
        concerts: async() => {
            return context.prisma.concert.findMany({
                include: { artist: true }
            });
        },
        genres: async() => {
            return context.prisma.genre.findMany();
        },
        artist: async(_: any, { id }: any) => {
            return context.prisma.artist.findUnique({
                where: { id }
            });
        },
        concert: async(_: any, { id }: any) => {
            return context.prisma.concert.findUnique({
                where: { id },
                include: { artist: true },
            });
        },
        genre: async(_: any, { id }: any) => {
            return context.prisma.genre.findUnique({
                where: { id }
            });
        },
    },
    Mutation: {
        createArtist: async(_: any, { artistname, }: any) => {
            return context.prisma.artist.create({
                data: { artistname, }
            });
        },
        createConcert: async(_: any, { title, city, date, price, artistid }: any) => {
            return context.prisma.concert.create({
                data: {
                    title,
                    city,
                    date,
                    price,
                    artist: { connect: { id: artistid } }
                }
            });
        },
        createGenre: async(_: any, { label }: any) => {
            return context.prisma.genre.create({
                data: { label, }
            });
        },
        addGenreToConcert: async(_: any, { concertid, genreid }: any) => {
            return context.prisma.concertgenre.create({
                data: {
                    concertid,
                    genreid
                }
            });
        },
        deleteArtist: async(_: any, { id }: any) => {
            return context.prisma.artist.delete({
                where: { id }
            });
        },
        deleteConcert: async(_: any, { id }: any) => {
            return context.prisma.concert.delete({
                where: { id }
            });
        },
        deleteGenre: async(_: any, { id }: any) => {
            return context.prisma.genre.delete({
                where: { id }
            });
        },
        deleteGenreFromConcert: async(_: any, { concertid, genreid }: any) => {
            return context.prisma.concertgenre.delete({
                where: {
                    concertid_genreid: {
                        concertid,
                        genreid
                    }
                }
            });
        },
        updateArtist: async(_: any, { id, artistname }: any) => {
            return context.prisma.artist.update({
                where: { id },
                data: { artistname }
            });
        },
        updateConcert: async(_: any, { id, title, city, date, price, artistid }: any) => {
            return context.prisma.concert.update({
                where: { id },
                data: {
                    title,
                    city,
                    date,
                    price,
                    artist: { connect: { id: artistid } }
                }
            });
        },
        updateGenre: async(_: any, { id, label }: any) => {
            return context.prisma.genre.update({
                where: { id },
                data: { label }
            });
        },
        updateGenreFromConcert: async(_: any, { concertid, genreid }: any) => {
            return context.prisma.concertgenre.update({
                where: {
                    concertid_genreid: {
                        concertid,
                        genreid
                    }
                },
                data: {
                    concertid,
                    genreid
                }
            });
        },
    }
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });