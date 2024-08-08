using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Domain.Help
{
    public class Helpper
    {
        public static string ConvertListToJsonString<T>(IList<T> aList)
        {
            var json = JsonConvert.SerializeObject(aList);
            return json;
        }
        public static string ConvertObjectToJsonString<T>(T data)
        {
            var json = JsonConvert.SerializeObject(data);
            return json;
        }
        public static List<T> ConvertJsonStringToList<T>(string json)
        {
            var aList = JsonConvert.DeserializeObject<List<T>>(json);
            return aList;
        }
        public static R ConvertJsonStringToObject<R>(string json)
        {
            var objectR = JsonConvert.DeserializeObject<R>(json);
            return objectR;
        }
        public static string ConvertDatatableToJsonString(DataTable dt)
        {
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
            return JsonConvert.SerializeObject(rows);
        }
        public static int? ConvertStringToIntstring(string pString)
        {
            if (string.IsNullOrWhiteSpace(pString))
            {
                return null;
            }
            return Int32.Parse(pString);
        }
        public  static readonly string[] stringSeparators = new string[] { "\r\n", " ", "\t" };
    }
}
