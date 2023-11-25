"use strict";

// Задание 1
// Создайте обычный объект "Музыкальная коллекция", который можно итерировать.
//     Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция
// альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
// Каждый альбом имеет следующую структуру:
//
// {
//     title: "Название альбома",
//     artist: "Исполнитель",
//     year: "Год выпуска"
// }
//
// Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их в консоль в формате:
//     Название альбома - Исполнитель (Год выпуска)

const musicalCollection = {
    albums: [
        {
            title: 'Back in Black',
            artist: 'AC/DC',
            year: 1980,
        },
        {
            title: 'Let There Be Rock',
            artist: 'AC/DC',
            year: 1977,
        },
        {
            title: 'Highway to Hell',
            artist: 'AC/DC',
            year: 1979,
        },
        {
            title: 'Physical Graffiti',
            artist: 'Led Zeppelin',
            year: 1975,
        },
        {
            title: 'Master of Puppets',
            artist: 'Metallica',
            year: 1986,
        }
    ],
    *[Symbol.iterator]() {
        for (let i = 0; i < this.albums.length; i++) {
            const { title, artist, year } = this.albums[i];
            yield `${title} — ${artist} (${year})`;
        }
    }
};

for (const album of musicalCollection) {
    console.log(album);
}
