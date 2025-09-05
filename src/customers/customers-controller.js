const customers = require('../../customers');

function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const ageDiff = Date.now() - birthDate.getTime();
  return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
}

function getAllCustomers(req, res) {
  let result = customers;

  if (req.query.gender) {
    const gender = req.query.gender.toLowerCase();
    result = result.filter(c => c.gender.toLowerCase() === gender);
  }

  if (req.query.minAge && req.query.maxAge) {
    const minAge = req.query.minAge;
    const maxAge = req.query.maxAge;
    result = result.filter(c => {
      const age = calculateAge(c.birthday);
      return age >= minAge && age <= maxAge;
    });
  }

  if (req.query.startDate && req.query.endDate) {
    const start = new Date(req.query.startDate);
    const end = new Date(req.query.endDate);
    result = result.filter(c => {
      const created = new Date(c.createdAt);
      return created >= start && created <= end;
    });
  }

  res.json(result);
}

function getCustomerById(req, res) {
  const id = req.params.id;
  const customer = customers.find(c => c.id == id); 
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  res.json(customer);
}

module.exports = {
  getAllCustomers,
  getCustomerById
};
