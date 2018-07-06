using System;
using System.ComponentModel.DataAnnotations;

namespace SugarLevelTracker.Models
{
    public class SugarLevel
    {
        public int Id { get; set; }

        [Required]
        public float Value { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime MeasuredAt { get; set; }
    }
}