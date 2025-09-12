const customers = require('../../customers');

function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

function getAllCustomers(req, res) {
  let result = customers;

  if (req.query.gender) {
    const gender = req.query.gender;
    result = result.filter(c => c.gender === gender);
  }

  if (req.query.minAge && req.query.maxAge) {
    const minAge = Number(req.query.minAge);
    const maxAge = Number(req.query.maxAge);
    result = result.filter(c => {
      const age = calculateAge(c.birthday);
      return age >= minAge && age <= maxAge;
    });
  }

  if (req.query.startDate && req.query.endDate) {
    const start = new Date(req.query.startDate);
    const end = new Date(req.query.endDate);
    if (!isNaN(start) && !isNaN(end)) {
      result = result.filter(c => {
        const created = new Date(c.createdAt);
        return created >= start && created <= end;
      });
    }
  }

  res.json(result);
}

function getCustomerById(req, res) {
  const id = String(req.params.id);
  const customer = customers.find(c => String(c.id) === id);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  res.json(customer);
}

module.exports = {
  getAllCustomers,
  getCustomerById
};
