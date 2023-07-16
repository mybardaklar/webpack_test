interface ITest {
  id: String;
  title: String;
  age: Number;
}

document.addEventListener('DOMContentLoaded', () => {
  const testObject: ITest = {
    id: 'sdasds',
    title: 'yasar',
    age: 44,
  };

  console.log(testObject);
});
