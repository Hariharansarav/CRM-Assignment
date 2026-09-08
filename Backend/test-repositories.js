import * as customerRepository from "./src/repositories/customer.repository.js";
import * as leadRepository from "./src/repositories/lead.repository.js";
import * as opportunityRepository from "./src/repositories/opportunity.repository.js";
import * as activityRepository from "./src/repositories/activity.repository.js";

const runTests = async () => {
  try {
    console.log("\n===== CUSTOMER TESTS =====");

    const customers = await customerRepository.findAll();
    console.log("All customers count:", customers.length);

    if (customers.length > 0) {
      const customer = await customerRepository.findById(customers[0].id);
      console.log("Customer by ID:", customer?.name, `(${customer?.company})`);

      const searchResult = await customerRepository.search("Tech");
      console.log("Customer search results count:", searchResult.length);

      const statusResult = await customerRepository.findByStatus("active");
      console.log("Customer active status count:", statusResult.length);
    }

    console.log("\n===== LEAD TESTS =====");

    const leads = await leadRepository.findAll();
    console.log("All leads count:", leads.length);

    if (leads.length > 0) {
      const lead = await leadRepository.findById(leads[0].id);
      console.log("Lead by ID:", lead?.name, `(${lead?.company})`);

      const searchResult = await leadRepository.search("John");
      console.log("Lead search results count:", searchResult.length);

      const statusResult = await leadRepository.findByStatus("New");
      console.log("Lead 'New' status count:", statusResult.length);
    }

    console.log("\n===== OPPORTUNITY TESTS =====");

    const opportunities = await opportunityRepository.findAll();
    console.log("All opportunities count:", opportunities.length);

    if (opportunities.length > 0) {
      const opportunity = await opportunityRepository.findById(
        opportunities[0].id
      );

      console.log("Opportunity by ID:", opportunity?.name, `($${opportunity?.value})`);

      const statusResult =
        await opportunityRepository.findByStatus("Won");

      console.log("Opportunity 'Won' status count:", statusResult.length);

      const customerOpportunities =
        await opportunityRepository.findByCustomerId(
          opportunities[0].customer_id
        );

      console.log(
        "Customer opportunities count:",
        customerOpportunities.length
      );
    }

    console.log("\n===== ACTIVITY TESTS =====");

    if (customers.length > 0) {
      const activities =
        await activityRepository.findByCustomerId(
          customers[0].id
        );

      console.log("Customer activities count:", activities.length);
    }

    console.log("\n===== ALL TESTS COMPLETED =====");

  } catch (error) {
    console.error("Repository test failed:", error);
  }

  process.exit();
};

runTests();
