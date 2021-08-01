test('1 Simple object', () => {

  let man = {
    name: 'John',
    age: 28
  };
  let manFullCopy = {...man}
  expect(manFullCopy).toEqual(man)
})

test('2. Array of primitives', () => {
  let numbers = [1, 2, 3];
  let numbersFullCopy = numbers.map(el => el)
  expect(numbersFullCopy).not.toBe(numbers)
  expect(numbersFullCopy).toEqual(numbers)
})

test('3. Object inside an object', () => {
  let man1 = {
    name: 'John',
    age: 28,
    mother: {
      name: 'Kate',
      age: 50
    }
  };
  let man1FullCopy = {...man1, mother: {...man1.mother}}
  expect(man1FullCopy).not.toBe(man1)
  expect(man1FullCopy.mother).not.toBe(man1.mother)
  expect(man1FullCopy).toEqual(man1)
})

test('4. Array of primitives inside an object', () => {
  let man2 = {
    name: 'John',
    age: 28,
    friends: ["Peter", "Steven", "William"]
  };

  let man2FullCopy = {...man2, friends: man2.friends.map(x => x)}  // your code
  expect(man2FullCopy).not.toBe(man2)
  expect(man2FullCopy.friends).not.toBe(man2.friends)
  expect(man2FullCopy).toEqual(man2)
})

test('5 Array of objects', () => {
  let people = [
    {name: "Peter", age: 30},
    {name: "Steven", age: 32},
    {name: "William", age: 28}
  ];

  let peopleFullCopy = people.map(e => ({...e}))  // your code
  expect(peopleFullCopy).not.toBe(people)
  expect(peopleFullCopy[0]).not.toBe(people[0])
  expect(peopleFullCopy[1]).not.toBe(people[1])
  expect(peopleFullCopy[2]).not.toBe(people[2])
  expect(peopleFullCopy).toEqual(people)
})

test('6 Array of objects inside object', () => {
  let man3 = {
    name: 'John',
    age: 28,
    friends: [
      {name: "Peter", age: 30},
      {name: "Steven", age: 32},
      {name: "William", age: 28}
    ]
  };
  let man3FullCopy = {...man3, friends: man3.friends.map(e => ({...e}))}
  expect(man3FullCopy).not.toBe(man3)
  expect(man3FullCopy.friends).not.toBe(man3.friends)
  expect(man3FullCopy.friends[0]).not.toBe(man3.friends[0])
  expect(man3FullCopy.friends[1]).not.toBe(man3.friends[1])
  expect(man3FullCopy.friends[2]).not.toBe(man3.friends[2])
  expect(man3FullCopy).toEqual(man3)
})

test('7 Object inside an object, inside an object', () => {
  let man4 = {
    name: 'John',
    age: 28,
    mother: {
      name: "Kate",
      age: 50,
      work: {
        position: "doctor",
        experience: 15
      }
    }
  };

  let man4FullCopy = {
    ...man4,
    mother: {
      ...man4.mother,
      work: {
        ...man4.mother.work
      }
    }
  }

  expect(man4FullCopy).not.toBe(man4)
  expect(man4FullCopy.mother).not.toBe(man4.mother)
  expect(man4FullCopy.mother.work).not.toBe(man4.mother.work)
  expect(man4FullCopy).toEqual(man4)
})

test('8 Array of objects inside object -> object', () => {
  let man5 = {
    name: 'John',
    age: 28,
    mother: {
      name: "Kate",
      age: 50,
      work: {
        position: "doctor",
        experience: 15
      },
      parents: [
        {name: "Kevin", age: 80},
        {name: "Jennifer", age: 78},
      ]
    }
  };

  let man5FullCopy = {
    ...man5,
    mother: {
      ...man5.mother,
      work: {...man5.mother.work},
      parents: man5.mother.parents.map(e => ({...e}))
    }
  }
  expect(man5FullCopy).not.toBe(man5)
  expect(man5FullCopy.mother).not.toBe(man5.mother)
  expect(man5FullCopy.mother.work).not.toBe(man5.mother.work)
  expect(man5FullCopy.mother.parents).not.toBe(man5.mother.parents)
  expect(man5FullCopy.mother.parents[0]).not.toBe(man5.mother.parents[0])
  expect(man5FullCopy.mother.parents[1]).not.toBe(man5.mother.parents[1])
  expect(man5FullCopy).toEqual(man5)
})

test('9 Object inside an object -> array -> object ->  object', () => {
  let man6 = {
    name: 'John',
    age: 28,
    mother: {
      name: "Kate",
      age: 50,
      work: {
        position: "doctor",
        experience: 15
      },
      parents: [
        {
          name: "Kevin",
          age: 80,
          favoriteDish: {
            title: "borscht"
          }
        },
        {
          name: "Jennifer",
          age: 78,
          favoriteDish: {
            title: "sushi"
          }
        },
      ]
    }
  };
  let man6FullCopy = {
    ...man6,
    mother: {
      ...man6.mother,
      work: {...man6.mother.work},
      parents: man6.mother.parents.map(e => ({
        ...e,
        favoriteDish: {
          ...e.favoriteDish
        }
      }))
    }
  }

  expect(man6FullCopy).not.toBe(man6) // почему то предупреждение ?
  expect(man6FullCopy.mother).not.toBe(man6.mother)
  expect(man6FullCopy.mother.work).not.toBe(man6.mother.work)
  expect(man6FullCopy.mother.parents).not.toBe(man6.mother.parents) // это надо ли?
  expect(man6FullCopy.mother.parents[0]).not.toBe(man6.mother.parents[0]) //можно ли как-то лучше протестировать
  expect(man6FullCopy.mother.parents[1]).not.toBe(man6.mother.parents[1])
  expect(man6FullCopy.mother.parents[0].favoriteDish).not.toBe(man6.mother.parents[0].favoriteDish)
  expect(man6FullCopy.mother.parents[1].favoriteDish).not.toBe(man6.mother.parents[1].favoriteDish)
  expect(man6FullCopy).toEqual(man6)
})

test('10 Array of objects inside an object -> object -> array -> object ->  object', () => {
  let man7 = {
    name: 'John',
    age: 28,
    mother: {
      name: "Kate",
      age: 50,
      work: {
        position: "doctor",
        experience: 15
      },
      parents: [
        {
          name: "Kevin",
          age: 80,
          favoriteDish: {
            title: "borscht",
            ingredients: [
              {title: "beet", amount: 3},
              {title: "potatoes", amount: 5},
              {title: "carrot", amount: 1},
            ]
          }
        },
        {
          name: "Jennifer",
          age: 78,
          favoriteDish: {
            title: "sushi",
            ingredients: [
              {title: "fish", amount: 1},
              {title: "rise", amount: 0.5}
            ]
          }
        },
      ]
    }
  }

  let man7FullCopy = {
    ...man7,
    mother: {
      ...man7.mother,
      work: {...man7.mother.work},
      parents: man7.mother.parents.map(e => ({...e,
        favoriteDish: ({...e.favoriteDish,
            ingredients: e.favoriteDish.ingredients.map(e2 => ({...e2}))
        })
      }))
    }
  }

  expect(man7FullCopy.mother).not.toBe(man7.mother)
  expect(man7FullCopy.mother.work).not.toBe(man7.mother.work)
  expect(man7FullCopy.mother.parents).not.toBe(man7.mother.parents) // это надо ли?
  expect(man7FullCopy.mother.parents[0]).not.toBe(man7.mother.parents[0]) //можно ли как-то лучше протестировать
  expect(man7FullCopy.mother.parents[1]).not.toBe(man7.mother.parents[1])
  expect(man7FullCopy.mother.parents[0].favoriteDish).not.toBe(man7.mother.parents[0].favoriteDish)
  expect(man7FullCopy.mother.parents[0].favoriteDish.ingredients[0]).not.toBe(man7.mother.parents[0].favoriteDish.ingredients[0])
  expect(man7FullCopy.mother.parents[0].favoriteDish.ingredients[1]).not.toBe(man7.mother.parents[0].favoriteDish.ingredients[1])
  expect(man7FullCopy.mother.parents[0].favoriteDish.ingredients[2]).not.toBe(man7.mother.parents[0].favoriteDish.ingredients[2])
  expect(man7FullCopy.mother.parents[1].favoriteDish).not.toBe(man7.mother.parents[1].favoriteDish)
  expect(man7FullCopy.mother.parents[1].favoriteDish.ingredients[0]).not.toBe(man7.mother.parents[1].favoriteDish.ingredients[0])
  expect(man7FullCopy.mother.parents[1].favoriteDish.ingredients[1]).not.toBe(man7.mother.parents[1].favoriteDish.ingredients[1])

  expect(man7FullCopy).toEqual(man7)
})
