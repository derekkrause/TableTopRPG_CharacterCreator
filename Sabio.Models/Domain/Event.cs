using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Event
    {
        /*
         * Id INT PRIMARY KEY IDENTITY NOT NULL,
	        Name NVARCHAR(100) NOT NULL,
	        ShortName NVARCHAR(20) NOT NULL,
	        EventTypeId INT NOT NULL,
	        StartDate DATE,
	        AddressId INT NOT NULL, <-- removed
	        EndDate DATE,
	        Description NVARCHAR(250),
	        WebsiteUrl NVARCHAR(250),
	        Logo NVARCHAR(250),
	        IsOngoing BIT NOT NULL,
	        Organizer NVARCHAR(250),
	        CreatedBy INT NOT NULL,
	        ModifiedBy INT NOT NULL,
	        DateCreated DATETIME2(7) NOT NULL,
	        DateModified DATETIME2(7)

            Added:
            @Street NVARCHAR(100),
            @Suite NVARCHAR(100),
            @City NVARCHAR(100),
            @State NVARCHAR(2),
            @Zip NVARCHAR(10),
            @Lat FLOAT,
            @Long FLOAT,
            @Geo GEOMETRY,
            @Id INT OUTPUT
            */

        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public int EventTypeId { get; set; }
        public DateTime? StartDate { get; set; }
        // public int AddressId { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string WebsiteUrl { get; set; }
        public string Logo { get; set; }
        public bool IsOngoing { get; set; }
        public string Organizer { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public string Street { get; set; }
        public string Suite { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
