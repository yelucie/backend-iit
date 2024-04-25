-- CreateTable
CREATE TABLE "artist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "artistname" STRING(255) NOT NULL,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concert" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" STRING(255) NOT NULL,
    "city" STRING(100) NOT NULL,
    "month" STRING(20) NOT NULL,
    "year" INT8 NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "artistid" UUID NOT NULL,

    CONSTRAINT "concert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" STRING(100) NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concertgenre" (
    "concertid" UUID NOT NULL,
    "genreid" UUID NOT NULL,

    CONSTRAINT "concertgenre_pkey" PRIMARY KEY ("concertid","genreid")
);

-- AddForeignKey
ALTER TABLE "concert" ADD CONSTRAINT "concert_artistid_fkey" FOREIGN KEY ("artistid") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "concertgenre" ADD CONSTRAINT "concertgenre_concertid_fkey" FOREIGN KEY ("concertid") REFERENCES "concert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "concertgenre" ADD CONSTRAINT "concertgenre_genreid_fkey" FOREIGN KEY ("genreid") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
