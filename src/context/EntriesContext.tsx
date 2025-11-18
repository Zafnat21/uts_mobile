import React, { createContext, useContext, useMemo, useState } from "react";

export type Film = {
  id: number;
  title: string;
  releaseYear: string;
  review: string;
  posterUrl: string;
  userRating: number;
  // 'isFavorite' sudah dihapus
};

type Ctx = {
  films: Film[];
  addFilm: (e: Omit<Film, "id">) => void;
  deleteFilm: (id: number) => void;
  getById: (id: string | number) => Film | undefined;
  updateFilm: (id: number, updatedData: Omit<Film, "id">) => void; // Ini fungsi Edit
};

const FilmsContext = createContext<Ctx | null>(null);

export function EntriesProvider({ children }: { children: React.ReactNode }) {
  // --- PERUBAHAN DI SINI ---
  const [films, setFilms] = useState<Film[]>([
    // Oppenheimer dan Dune dihapus
    {
      id: 3,
      title: "The Batman",
      releaseYear: "2022",
      review:
        "Versi Batman yang kelam, detektif, dan sangat grounded. Pattinson keren.",
      posterUrl:
        "https://i.pinimg.com/736x/51/26/08/512608d675fd98fca4105f90ab7d6d5c.jpg",
      userRating: 5,
    },
    {
      id: 4,
      title: "That Time I Got Reincarnated as a Slime: Scarlet Bond",
      releaseYear: "2022",
      review:
        "Movie-nya seru! Cerita sampingan yang solid untuk para fans Rimuru.",
      posterUrl:
        "https://i.pinimg.com/736x/c2/26/07/c22607637e33b07c6ecd3441e0ce5e0b.jpg",
      userRating: 5,
    },
    {
      id: 5,
      title: "Coco",
      releaseYear: "2017",
      review:
        "Animasi Pixar yang indah dan menyentuh hati tentang keluarga dan ingatan. Bikin nangis!",
      posterUrl:
        "https://i.pinimg.com/736x/a1/6c/89/a16c89e3dcd2bbc3d19c1c23ceaf266d.jpg",
      userRating: 5,
    },
    {
      id: 6,
      title: "Godzilla Minus One",
      releaseYear: "2023",
      review:
        "Godzilla terbaik dalam beberapa dekade. Fokus pada drama manusianya sangat kuat.",
      posterUrl:
        "https://i.pinimg.com/736x/e9/ca/eb/e9caebdb1b9344e614bbf784367be985.jpg",
      userRating: 5,
    },
    // FILM BARU YANG DITAMBAHKAN
    {
      id: 7,
      title: "That Time I Got Reincarnated as a Slime the Movie: Tears of the Azure Sea",
      releaseYear: "2026",
      review: "Petualangan baru Rimuru dan para monster dari Tempest! Kali ini, sebuah undangan misterius membawa mereka ke sebuah kerajaan di lautan, di mana legenda 'Air Mata Laut Biru' kuno terancam disalahgunakan.",
      posterUrl: "https://scontent.fbdo9-1.fna.fbcdn.net/v/t39.30808-6/514341860_1138665691622540_3798565342268168528_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tYNeuhifxWUQ7kNvwGxQlJ-&_nc_oc=Adl3_RpwnVciBaG7DSMzIjunO4mMxKDjG8z2j5--3rC9Oq2AbfhdlVGdsSdgrQbBHPI&_nc_zt=23&_nc_ht=scontent.fbdo9-1.fna&_nc_gid=2Op3Gfbu_h7HcCbvP0jzyg&oh=00_AfjXhH-mkbxCH_O6gFmCuU4T31jDYFbTcg53CfwrYMEyaA&oe=691C92C2",
      userRating: 5, // Kita beri rating 5
    },
  ]);
  // --- Akhir Perubahan ---

  const addFilm = (e: Omit<Film, "id">) =>
    setFilms((prev) => [{ id: Date.now(), ...e }, ...prev]);

  const deleteFilm = (id: number) =>
    setFilms((prev) => prev.filter((it) => it.id !== id));

  const getById = (id: string | number) => {
    const n = Number(id);
    return films.find((e) => e.id === n);
  };

  const updateFilm = (id: number, updatedData: Omit<Film, "id">) => {
    setFilms((prev) =>
      prev.map((film) =>
        film.id === id ? { ...updatedData, id: film.id } : film
      )
    );
  };

  const value = useMemo(
    () => ({ films, addFilm, deleteFilm, getById, updateFilm }),
    [films]
  );

  return (
    <FilmsContext.Provider value={value}>{children}</FilmsContext.Provider>
  );
}

export function useEntries() {
  const ctx = useContext(FilmsContext);
  if (!ctx) throw new Error("useEntries must be inside EntriesProvider");
  return ctx;
}