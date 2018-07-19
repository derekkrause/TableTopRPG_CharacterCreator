using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using Sabio.Data.Providers;
using Sabio.Models;

namespace Sabio.Services
{
    class UserTableServices
    {
        string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        //  POST/CREATE
        public int Create(UserCreateRequest request)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "User_Insert";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("@FirstName", request.FirstName);
                cmd.Parameters.AddWithValue("@MiddleName", request.MiddleName ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@LastName", request.LastName);
                cmd.Parameters.AddWithValue("@Gender", request.Gender);
                cmd.Parameters.AddWithValue("@AvatarUrl", request.AvatarUrl);
                cmd.Parameters.AddWithValue("@Email", request.Email);
                cmd.Parameters.AddWithValue("@PasswordHash", request.PasswordHash);

                cmd.ExecuteNonQuery();

                return (int)cmd.Parameters['@Id'].Value;
            }
        }

        // PUT / UPDATE / EDIT
        public void Update(UserUpdateRequest request)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "User_Update";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", request.Id);
                cmd.Parameters.AddWithValue("@FirstName", request.FirstName);
                cmd.Parameters.AddWithValue("@MiddleName", request.MiddleName ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@LastName", request.LastName);
                cmd.Parameters.AddWithValue("@Gender", request.Gender);
                cmd.Parameters.AddWithValue("@AvatarUrl", request.AvatarUrl);
                cmd.Parameters.AddWithValue("@Email", request.Email);
                cmd.Parameters.AddWithValue("@PasswordHash", request.PasswordHash);

                cmd.ExecuteNonQuery();
            }
        }
        
    }
}
