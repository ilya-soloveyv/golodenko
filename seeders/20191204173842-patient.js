'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'patient',
      [
        {
          iPatientID: 1,
          sPatientLastname: 'Купер',
          sPatientMiddlename: 'Ли',
          sPatientFirstname: 'Шелдон',
          dDateBirthday: '1973-03-24'
        },
        {
          iPatientID: 2,
          sPatientLastname: null,
          sPatientMiddlename: null,
          sPatientFirstname: 'Пенни',
          dDateBirthday: '1985-10-30'
        },
        {
          iPatientID: 3,
          sPatientLastname: 'Ростенковски',
          sPatientMiddlename: 'Мэри-Энн',
          sPatientFirstname: 'Бернадетт',
          dDateBirthday: '1980-06-23'
        },
        {
          iPatientID: 4,
          sPatientLastname: 'Хофштадтер',
          sPatientMiddlename: 'Лики',
          sPatientFirstname: 'Леонард',
          dDateBirthday: '1975-04-30'
        },
        {
          iPatientID: 5,
          sPatientLastname: 'Фаулер',
          sPatientMiddlename: 'Фара',
          sPatientFirstname: 'Эми',
          dDateBirthday: '1975-12-12'
        },
        {
          iPatientID: 6,
          sPatientLastname: 'Воловиц',
          sPatientMiddlename: 'Джоэл',
          sPatientFirstname: 'Говард',
          dDateBirthday: '1980-12-09'
        },
        {
          iPatientID: 7,
          sPatientLastname: 'Кутраппали',
          sPatientMiddlename: 'Рамаян',
          sPatientFirstname: 'Раджеш',
          dDateBirthday: '1981-04-30'
        },
        {
          iPatientID: 8,
          sPatientLastname: 'Блум',
          sPatientMiddlename: null,
          sPatientFirstname: 'Стюарт',
          dDateBirthday: null
        },
        {
          iPatientID: 9,
          sPatientLastname: 'Крипке',
          sPatientMiddlename: null,
          sPatientFirstname: 'Барри',
          dDateBirthday: null
        },
        {
          iPatientID: 10,
          sPatientLastname: 'Кутраппали',
          sPatientMiddlename: null,
          sPatientFirstname: 'Прия',
          dDateBirthday: null
        },
        {
          iPatientID: 11,
          sPatientLastname: null,
          sPatientMiddlename: null,
          sPatientFirstname: 'Люси',
          dDateBirthday: null
        },
        {
          iPatientID: 12,
          sPatientLastname: 'Купер',
          sPatientMiddlename: 'Ли',
          sPatientFirstname: 'Шелдон',
          dDateBirthday: '1973-03-24'
        },
        {
          iPatientID: 13,
          sPatientLastname: null,
          sPatientMiddlename: null,
          sPatientFirstname: 'Пенни',
          dDateBirthday: '1985-10-30'
        },
        {
          iPatientID: 14,
          sPatientLastname: 'Ростенковски',
          sPatientMiddlename: 'Мэри-Энн',
          sPatientFirstname: 'Бернадетт',
          dDateBirthday: '1980-06-23'
        },
        {
          iPatientID: 15,
          sPatientLastname: 'Хофштадтер',
          sPatientMiddlename: 'Лики',
          sPatientFirstname: 'Леонард',
          dDateBirthday: '1975-04-30'
        },
        {
          iPatientID: 16,
          sPatientLastname: 'Фаулер',
          sPatientMiddlename: 'Фара',
          sPatientFirstname: 'Эми',
          dDateBirthday: '1975-12-12'
        },
        {
          iPatientID: 17,
          sPatientLastname: 'Воловиц',
          sPatientMiddlename: 'Джоэл',
          sPatientFirstname: 'Говард',
          dDateBirthday: '1980-12-09'
        },
        {
          iPatientID: 18,
          sPatientLastname: 'Кутраппали',
          sPatientMiddlename: 'Рамаян',
          sPatientFirstname: 'Раджеш',
          dDateBirthday: '1981-04-30'
        },
        {
          iPatientID: 19,
          sPatientLastname: 'Блум',
          sPatientMiddlename: null,
          sPatientFirstname: 'Стюарт',
          dDateBirthday: null
        },
        {
          iPatientID: 20,
          sPatientLastname: 'Крипке',
          sPatientMiddlename: null,
          sPatientFirstname: 'Барри',
          dDateBirthday: null
        },
        {
          iPatientID: 21,
          sPatientLastname: 'Кутраппали',
          sPatientMiddlename: null,
          sPatientFirstname: 'Прия',
          dDateBirthday: null
        },
        {
          iPatientID: 22,
          sPatientLastname: null,
          sPatientMiddlename: null,
          sPatientFirstname: 'Люси',
          dDateBirthday: null
        },
        {
          iPatientID: 23,
          sPatientLastname: 'Крипке',
          sPatientMiddlename: null,
          sPatientFirstname: 'Барри',
          dDateBirthday: null
        },
        {
          iPatientID: 24,
          sPatientLastname: 'Кутраппали',
          sPatientMiddlename: null,
          sPatientFirstname: 'Прия',
          dDateBirthday: null
        },
        {
          iPatientID: 25,
          sPatientLastname: null,
          sPatientMiddlename: null,
          sPatientFirstname: 'Люси',
          dDateBirthday: null
        },
        {
          iPatientID: 26,
          sPatientLastname: 'Купер',
          sPatientMiddlename: 'Ли',
          sPatientFirstname: 'Шелдон',
          dDateBirthday: '1973-03-24'
        },
        {
          iPatientID: 27,
          sPatientLastname: null,
          sPatientMiddlename: null,
          sPatientFirstname: 'Пенни',
          dDateBirthday: '1985-10-30'
        },
        {
          iPatientID: 28,
          sPatientLastname: 'Ростенковски',
          sPatientMiddlename: 'Мэри-Энн',
          sPatientFirstname: 'Бернадетт',
          dDateBirthday: '1980-06-23'
        },
        {
          iPatientID: 29,
          sPatientLastname: 'Хофштадтер',
          sPatientMiddlename: 'Лики',
          sPatientFirstname: 'Леонард',
          dDateBirthday: '1975-04-30'
        },
        {
          iPatientID: 30,
          sPatientLastname: 'Фаулер',
          sPatientMiddlename: 'Фара',
          sPatientFirstname: 'Эми',
          dDateBirthday: '1975-12-12'
        },
        {
          iPatientID: 31,
          sPatientLastname: 'Воловиц',
          sPatientMiddlename: 'Джоэл',
          sPatientFirstname: 'Говард',
          dDateBirthday: '1980-12-09'
        },
        {
          iPatientID: 32,
          sPatientLastname: 'Кутраппали',
          sPatientMiddlename: 'Рамаян',
          sPatientFirstname: 'Раджеш',
          dDateBirthday: '1981-04-30'
        },
        {
          iPatientID: 33,
          sPatientLastname: 'Блум',
          sPatientMiddlename: null,
          sPatientFirstname: 'Стюарт',
          dDateBirthday: null
        },
        {
          iPatientID: 34,
          sPatientLastname: 'Крипке',
          sPatientMiddlename: null,
          sPatientFirstname: 'Барри',
          dDateBirthday: null
        },
        {
          iPatientID: 35,
          sPatientLastname: 'Кутраппали',
          sPatientMiddlename: null,
          sPatientFirstname: 'Прия',
          dDateBirthday: null
        },
        {
          iPatientID: 36,
          sPatientLastname: null,
          sPatientMiddlename: null,
          sPatientFirstname: 'Люси',
          dDateBirthday: null
        },
        {
          iPatientID: 37,
          sPatientLastname: 'Купер',
          sPatientMiddlename: 'Ли',
          sPatientFirstname: 'Шелдон',
          dDateBirthday: '1973-03-24'
        },
        {
          iPatientID: 38,
          sPatientLastname: null,
          sPatientMiddlename: null,
          sPatientFirstname: 'Пенни',
          dDateBirthday: '1985-10-30'
        },
        {
          iPatientID: 39,
          sPatientLastname: 'Ростенковски',
          sPatientMiddlename: 'Мэри-Энн',
          sPatientFirstname: 'Бернадетт',
          dDateBirthday: '1980-06-23'
        },
        {
          iPatientID: 40,
          sPatientLastname: 'Хофштадтер',
          sPatientMiddlename: 'Лики',
          sPatientFirstname: 'Леонард',
          dDateBirthday: '1975-04-30'
        },
        {
          iPatientID: 41,
          sPatientLastname: 'Фаулер',
          sPatientMiddlename: 'Фара',
          sPatientFirstname: 'Эми',
          dDateBirthday: '1975-12-12'
        },
        {
          iPatientID: 42,
          sPatientLastname: 'Воловиц',
          sPatientMiddlename: 'Джоэл',
          sPatientFirstname: 'Говард',
          dDateBirthday: '1980-12-09'
        },
        {
          iPatientID: 43,
          sPatientLastname: 'Кутраппали',
          sPatientMiddlename: 'Рамаян',
          sPatientFirstname: 'Раджеш',
          dDateBirthday: '1981-04-30'
        },
        {
          iPatientID: 44,
          sPatientLastname: 'Блум',
          sPatientMiddlename: null,
          sPatientFirstname: 'Стюарт',
          dDateBirthday: null
        },
        {
          iPatientID: 45,
          sPatientLastname: 'Крипке',
          sPatientMiddlename: null,
          sPatientFirstname: 'Барри',
          dDateBirthday: null
        },
        {
          iPatientID: 46,
          sPatientLastname: 'Кутраппали',
          sPatientMiddlename: null,
          sPatientFirstname: 'Прия',
          dDateBirthday: null
        },
        {
          iPatientID: 47,
          sPatientLastname: null,
          sPatientMiddlename: null,
          sPatientFirstname: 'Люси',
          dDateBirthday: null
        },
        {
          iPatientID: 48,
          sPatientLastname: 'Крипке',
          sPatientMiddlename: null,
          sPatientFirstname: 'Барри',
          dDateBirthday: null
        },
        {
          iPatientID: 49,
          sPatientLastname: 'Кутраппали',
          sPatientMiddlename: null,
          sPatientFirstname: 'Прия',
          dDateBirthday: null
        },
        {
          iPatientID: 50,
          sPatientLastname: null,
          sPatientMiddlename: null,
          sPatientFirstname: 'Люси',
          dDateBirthday: null
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('patient', null, {})
  }
}
