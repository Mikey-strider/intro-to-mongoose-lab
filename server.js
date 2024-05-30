const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const prompt = require('prompt-sync')();
const CustomerModel = require('./models/customer');

const username = prompt('What is your name? ');

console.log(`Your name is ${username}`);

const custWelcome = prompt('Welcome to the Customer Menu.')
console.log(custWelcome);



const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await runQueries();
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit();
};

const runQueries = async () => {
  console.log('Queries running!');
  await createCustomer();
  await viewAllCustomers();
  await updateCustomer();
  await deleteCustomer();
}

// Create a customer

async function createCustomer(){
  const custData = {
    name: 'Mikey',
    age: 40
  }
const cust = await CustomerModel.create(custData);
console.log(cust);

}

// View all customers

async function viewAllCustomers() {
  const allCustomers = await CustomerModel.find({})
  console.log('==============');
  console.log(allCustomers);
  console.log('==============');
}

// Update a customer

async function updateCustomer() {
  const id = '6658f1840158120ad3082b1a'
  const updateCustData = await CustomerModel.findByIdAndUpdate(id, {age: 41}, {new: true});
  console.log('updates customer', updateCustData);
}

// Delete A customer

async function deleteCustomer() {
  const id = '6658f1840158120ad3082b1a';
  const deleteCustData = await CustomerModel.findByIdAndDelete(id);
  console.log(deleteCustData);
}

// Quit Program

// const disconnect = async () => {
//   await mongoose.disconnect();
//   console.log('Disconnected from MongoDB');
//   process.exit();
// }



connect();
// disconnect();