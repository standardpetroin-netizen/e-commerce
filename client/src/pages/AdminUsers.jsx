import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";
import { toast } from "react-toastify";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSearch,
  FiUser,
} from "react-icons/fi";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedUser, setExpandedUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/user/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-12 w-12 border-4 border-[#E7C6C2] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-[#2B2B2B]">
      
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">User Management</h1>
        <p className="text-[#7A6F6B] mt-1">
          Manage customers across men, women & kids collections
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-[#FFFDFB] rounded-xl shadow-sm border border-[#EADDD7] p-4">
        <div className="flex items-center gap-3 bg-[#F5EDE6] px-4 py-3 rounded-lg">
          <FiSearch className="text-[#8C7F7B]" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* USER LIST */}
      {filteredUsers.length === 0 ? (
        <div className="bg-[#FFFDFB] border border-[#EADDD7] p-10 rounded-xl text-center">
          No users found
        </div>
      ) : (
        <div className="space-y-5">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-[#FFFDFB] border border-[#EADDD7] rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* USER HEADER */}
              <div
                onClick={() =>
                  setExpandedUser(
                    expandedUser === user._id ? null : user._id
                  )
                }
                className="p-5 cursor-pointer"
              >
                <div className="grid md:grid-cols-4 gap-4 items-center">

                  <div className="flex items-center gap-3">
                    <div className="bg-[#E7C6C2] p-3 rounded-full">
                      <FiUser className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8C7F7B]">NAME</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-[#8C7F7B]">EMAIL</p>
                    <p className="truncate">{user.email}</p>
                  </div>

                  <div>
                    <p className="text-xs text-[#8C7F7B]">JOINED</p>
                    <p>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-[#F3D6D3] text-[#8B3A3A]"
                          : "bg-[#E7EFE7] text-[#3C6E47]"
                      }`}
                    >
                      {user.role === "admin" ? "Admin" : "Customer"}
                    </span>
                  </div>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {expandedUser === user._id && (
                <div className="border-t border-[#EADDD7] p-6 bg-[#F5EDE6]/40 space-y-6">

                  {/* PERSONAL INFO */}
                  <div>
                    <h4 className="font-bold mb-3">Personal Info</h4>

                    <div className="grid md:grid-cols-2 gap-4">
                      <InfoCard
                        icon={<FiMail />}
                        label="Email"
                        value={user.email}
                      />
                      {user.phone && (
                        <InfoCard
                          icon={<FiPhone />}
                          label="Phone"
                          value={user.phone}
                        />
                      )}
                    </div>
                  </div>

                  {/* ADDRESS */}
                  {(user.street || user.city) && (
                    <div>
                      <h4 className="font-bold mb-3">Address</h4>

                      <div className="bg-white border border-[#EADDD7] p-4 rounded-lg flex gap-3">
                        <FiMapPin className="mt-1 text-[#8C7F7B]" />
                        <div>
                          <p>{user.street}</p>
                          <p>
                            {user.city}, {user.state} {user.zipcode}
                          </p>
                          <p>{user.country}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <StatCard
          title="Total Users"
          value={users.length}
        />

        <StatCard
          title="Admins"
          value={users.filter((u) => u.role === "admin").length}
        />

        <StatCard
          title="Customers"
          value={users.filter((u) => u.role !== "admin").length}
        />

      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white border border-[#EADDD7] p-4 rounded-lg">
    <div className="flex items-center gap-2 text-[#8C7F7B] mb-1">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
    <p className="font-medium">{value}</p>
  </div>
);

const StatCard = ({ title, value }) => (
  <div className="bg-[#FFFDFB] border border-[#EADDD7] p-6 rounded-xl shadow-sm hover:shadow-md transition">
    <p className="text-sm text-[#8C7F7B]">{title}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default AdminUsers;