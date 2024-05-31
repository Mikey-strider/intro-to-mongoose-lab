const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const prompt = require('prompt-sync')();
const CustomerModel = require('./models/customer');

const username = prompt('What is your name? ');

console.log(`Your name is ${username}`);

let customerInput;

function mainMenu() {
  const custWelcome = prompt('Welcome to the Customer Menu.')
  console.log(custWelcome);
  console.log('1. Create a customer');
  console.log('2. View all customer');
  console.log('3. Update a customer');
  console.log('4. Delete a customer');
  console.log('5. Quit Program');
  customerInput = prompt('What do you want to do?');
  custMenu(customerInput)
}



async function custMenu(custOption) {
  switch (custOption) {
    case "1":
      return createCustomer();
    case "2":
      return viewAllCustomers();
    case "3":
      return updateCustomer();
    case "4":
      return deleteCustomer();
    case "5":
      console.log('Thank you, and have a nice day!')
      await mongoose.disconnect();
      return process.exit();
    default:
      console.log('Sorry that did not work try again please.')
      return mainMenu();
  }
}


const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await runQueries();

};



const runQueries = async () => {
  console.log('Queries running!');
  mainMenu();
}

async function customerInfo() {
  const custView = await CustomerModel.find({});
  custView.map((customer) => {
    console.log(`id: ${customer._id} name: ${customer.name}, age: ${customer.age}`);
  })
}

// Create a customer

async function createCustomer() {
  const creatingCust = prompt("Ok, let's create a new customer. What is their name?");
  const creatingAge = prompt("What is their age?");
  const custData = {
    name: creatingCust,
    age: creatingAge
  }
  const cust = await CustomerModel.create(custData);
  console.log(cust);
  mainMenu();
}

// View all customers

async function viewAllCustomers() {
  const allCustomers = await CustomerModel.find({})
  console.log('==============');
  console.log(allCustomers);
  console.log('==============');
  mainMenu();
}

// Update a customer

async function updateCustomer() {
  await customerInfo();
  const choosingCustId = prompt("Please select a customer ID and paste it here.")
  const id = choosingCustId;
  console.log(id)
  const updatingName = prompt("Update customer name. ");
  const updatingAge = prompt("Update age here. ");
  const updateCustName = await CustomerModel.findByIdAndUpdate(id, { name: updatingName }, { new: true });
  const updateCustAge = await CustomerModel.findByIdAndUpdate(id, { age: updatingAge }, { new: true });
  console.log('updates customer', updateCustName);
  console.log(updateCustAge);
  mainMenu();
}

// Delete A customer

async function deleteCustomer() {
  await customerInfo();
  const deletingCust = prompt("Please pick the customer you wish to delete by selecting the ID");
  const deleteCustData = await CustomerModel.findByIdAndDelete(deletingCust);
  console.log(deleteCustData);
  mainMenu();
}



// 



connect();
