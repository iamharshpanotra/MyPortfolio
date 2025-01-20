using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Test1
{
    public partial class Fileupload_control : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnUpload_Click(object sender, EventArgs e)
        {
            // If the user has selected a file
            if (FileUpload1.HasFile)
            {
                // Get the file extension
                string fileExtension = System.IO.Path.GetExtension(FileUpload1.FileName);

                if (fileExtension.ToLower() != ".doc" && fileExtension.ToUpper() != ".docx")
                {
                    lblMessage.ForeColor = System.Drawing.Color.Red;
                    lblMessage.Text = "Only files with .doc and .docx extension are allowed";
                }
                else
                {
                    // Get the file size
                    int fileSize = FileUpload1.PostedFile.ContentLength;
                    // If file size is greater than 2 MB
                    if (fileSize > 2097152)
                    {
                        lblMessage.ForeColor = System.Drawing.Color.Red;
                        lblMessage.Text = "File size cannot be greater than 2 MB";
                    }
                    else
                    {
                        // Upload the file
                        FileUpload1.SaveAs(Server.MapPath("~/Uploads/" + FileUpload1.FileName));
                        lblMessage.ForeColor = System.Drawing.Color.Green;
                        lblMessage.Text = "File uploaded successfully";
                    }
                }
            }
            else
            {
                lblMessage.ForeColor = System.Drawing.Color.Red;
                lblMessage.Text = "Please select a file";
            }

        }
    }
}