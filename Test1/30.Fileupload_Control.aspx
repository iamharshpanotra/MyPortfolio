<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="30.Fileupload_Control.aspx.cs" Inherits="Test1.Fileupload_control" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <fieldset>
                <legend align="center">Fileupload control</legend>
                <asp:FileUpload ID="FileUpload1" runat="server" />
                &nbsp;
                <asp:Button ID="btnUpload" runat="server" Text="Upload File" onclick="btnUpload_Click" />
                <br />
                <asp:Label ID="lblMessage" Font-Bold="true" runat="server">
                </asp:Label>
               
            </fieldset>
        </div>
    </form>
</body>
</html>
