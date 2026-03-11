import AccessControl "authorization/access-control";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import List "mo:core/List";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Types
  public type Gender = {
    #male;
    #female;
    #any;
  };

  public type Shift = {
    #day;
    #night;
    #flexibleShifts;
  };

  public type TimePreference = {
    #day;
    #night;
  };

  public type SalaryRange = {
    min : Nat;
    max : Nat;
  };

  public type JobListing = {
    id : Nat;
    title : Text;
    company : Text;
    location : Text;
    distance : Nat;
    salary : SalaryRange;
    shift : Shift;
    genderPreference : Gender;
    description : Text;
    requirements : Text;
    postedDate : Time.Time;
    contactNumber : ?Text;
  };

  public type JobApplication = {
    applicantName : Text;
    dateOfBirth : Text;
    phoneNumber : Text;
    address : Text;
    gender : Gender;
    preferredTiming : TimePreference;
    availableFromDate : Text;
    expectedSalary : Nat;
    jobId : Nat;
    agreementAccepted : Bool;
    submissionTimestamp : Time.Time;
    resumeFileId : ?Nat;
    additionalInfo : ?Text;
  };

  public type UserProfile = {
    name : Text;
    email : ?Text;
    phoneNumber : ?Text;
  };

  // Comparison modules for sorting
  module JobListing {
    public func compareBySalaryRangeAscending(a : JobListing, b : JobListing) : Order.Order {
      let minSalaryComparison = Nat.compare(a.salary.min, b.salary.min);
      switch (minSalaryComparison) {
        case (#equal) { Nat.compare(a.salary.max, b.salary.max) };
        case (order) { order };
      };
    };

    public func compareByDistance(a : JobListing, b : JobListing) : Order.Order {
      Nat.compare(a.distance, b.distance);
    };

    public func compareByPostedDateDescending(a : JobListing, b : JobListing) : Order.Order {
      Int.compare(b.postedDate, a.postedDate);
    };

    public func compare(a : JobListing, b : JobListing) : Order.Order {
      compareByPostedDateDescending(a, b);
    };
  };

  module JobApplication {
    public func compareBySubmissionTimeNewestFirst(a : JobApplication, b : JobApplication) : Order.Order {
      Int.compare(b.submissionTimestamp, a.submissionTimestamp);
    };

    public func compare(a : JobApplication, b : JobApplication) : Order.Order {
      compareBySubmissionTimeNewestFirst(a, b);
    };
  };

  // State
  var nextJobId = 1;

  let jobListings = Map.empty<Nat, JobListing>();
  let jobApplications = Map.empty<Nat, List.List<JobApplication>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Job Listings
  public shared ({ caller }) func addJobListing(title : Text, company : Text, location : Text, distance : Nat, minSalary : Nat, maxSalary : Nat, shift : Shift, genderPreference : Gender, description : Text, requirements : Text, contactNumber : ?Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add job listings");
    };

    let jobListing : JobListing = {
      id = nextJobId;
      title;
      company;
      location;
      distance;
      salary = { min = minSalary; max = maxSalary };
      shift;
      genderPreference;
      description;
      requirements;
      postedDate = Time.now();
      contactNumber;
    };

    jobListings.add(nextJobId, jobListing);
    let currentId = nextJobId;
    nextJobId += 1;
    currentId;
  };

  // Applications
  public shared ({ caller }) func submitApplication(applicantName : Text, dateOfBirth : Text, phoneNumber : Text, address : Text, gender : Gender, preferredTiming : TimePreference, availableFromDate : Text, expectedSalary : Nat, jobId : Nat, agreementAccepted : Bool, resumeFileId : ?Nat, additionalInfo : ?Text) : async () {
    // Anyone can submit an application - no authorization check needed

    // Check if job exists
    if (not jobListings.containsKey(jobId)) {
      Runtime.trap("Job does not exist");
    };

    let application : JobApplication = {
      applicantName;
      dateOfBirth;
      phoneNumber;
      address;
      gender;
      preferredTiming;
      availableFromDate;
      expectedSalary;
      jobId;
      agreementAccepted;
      submissionTimestamp = Time.now();
      resumeFileId;
      additionalInfo;
    };

    let existingApps = switch (jobApplications.get(jobId)) {
      case (null) { List.empty<JobApplication>() };
      case (?apps) { apps };
    };

    existingApps.add(application);
    jobApplications.add(jobId, existingApps);
  };

  // Getters
  public query ({ caller }) func getAllJobListings() : async [JobListing] {
    // Anyone can view job listings - no authorization check needed
    jobListings.values().toArray().sort();
  };

  public query ({ caller }) func getJobListingsByLocation(location : Text) : async [JobListing] {
    // Anyone can view job listings - no authorization check needed
    switch (location.isEmpty()) {
      case (true) {
        jobListings.values().toArray().sort(JobListing.compareByPostedDateDescending);
      };
      case (false) {
        jobListings.values().toArray().filter(func(j) { j.location.contains(#text location) });
      };
    };
  };

  public query ({ caller }) func getJobListingsByDistance(maxDistance : Nat) : async [JobListing] {
    // Anyone can view job listings - no authorization check needed
    switch (maxDistance) {
      case (0) { jobListings.values().toArray().sort(JobListing.compareByDistance) };
      case (_) { jobListings.values().toArray().filter(func(j) { j.distance <= maxDistance }) };
    };
  };

  public query ({ caller }) func getJobListingsBySalaryRange(minSalary : Nat, maxSalary : Nat) : async [JobListing] {
    // Anyone can view job listings - no authorization check needed
    jobListings.values().toArray().filter(func(j) { j.salary.min >= minSalary and j.salary.max <= maxSalary });
  };

  public query ({ caller }) func getJobListingsByPostedDate(_ : Time.Time) : async [JobListing] {
    // Anyone can view job listings - no authorization check needed
    jobListings.values().toArray().sort(JobListing.compareByPostedDateDescending);
  };

  public query ({ caller }) func getApplicationsForJob(jobId : Nat) : async [JobApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view applications for jobs");
    };
    switch (jobApplications.get(jobId)) {
      case (null) { [] };
      case (?apps) {
        apps.toArray().sort();
      };
    };
  };
};
