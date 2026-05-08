const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));



app.post('/api/notes', (req, res) => {
  const newNote = {
    id: notes.length + 1,
    ...req.body
  };

  notes.push(newNote);
  res.json(notes);
})

let notes = [
  {
    id: 1,
    title: "Market",
    content: "Süt ve yumurta al",
    complete: false
  },
  {
    id: 2,
    title: "Ödev",
    content: "Fizik ödevini tamamla",
    complete: false
  },
  {
    id: 3,
    title: "Borç",
    content: "Ahmete borcunu öde",
    complete: false
  }
]

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

//express js bu get fonksiyonuna otomatik olarak iki önemli nesne gönderiyor
// bizde onları req ve res değişkenlerinde tutuyoruz.
//req (Request): Frontend'den bize gelen isteğin tüm detayları (İstekte hangi veriler var? Tarayıcısı ne? vs.)
//res (Response): Bizim geriye yollayacağımız cevap.

//Delete işlemi

app.delete('/api/notes/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let newNotes = notes.filter((note) => {
    if(note.id == id) {
      return false;
    }
    else {
      return true;
    }
  });

  notes = newNotes;
  res.json(notes);
});

//Güncelleme işi

app.put('/api/notes/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let findedNote = notes.find((note) => {
    return note.id == id;
  });
  if(findedNote != undefined) {
    findedNote.title = req.body.title;
    findedNote.content = req.body.content;
    findedNote.complete = req.body.complete;
    
    res.json(notes);
  }
  else {
    res.status(404).send("Not bulunamadı.")
  }
});

/*
ID'yi Yakala: req.params.id diyerek URL'den gelen numarayı al. Çok Önemli Bir Detay: URL üzerinden gelen her şey (sayı bile olsa) arka plana metin (String) olarak gelir. Yani 2 değil, "2" gelir. Bunu JavaScript'in parseInt() veya Number() fonksiyonu ile gerçek bir sayıya çevirmeyi unutma.
*/
//':id dinamik bir değişken olduğu anlamına gelir'



app. listen(3000, () => {
  console.log("Sunucu 3000 portunda ayaklandı!");
});
