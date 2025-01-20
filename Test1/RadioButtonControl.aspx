<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RadioButtonControl.aspx.cs" Inherits="Test1.RadioButtonControl" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <fieldset>
                <legend align="center">Radio Button Control</legend>

                <h3 align="center">Important Properties of the Radio Button Control.</h3>

                <p><em><strong>Checked - </strong></em>This is a boolean property, that is used to check if the button is checked or not.
                    <br /><br />
                    <em><strong>Text - </strong></em>This is string property used to get or set the text associated with the radio button control
                    <br /><br />
                    <em><strong>TextAlign - </strong></em>right or left. On which side of the radio button the text should appear
                    <br /><br />
                    <em><strong>AutoPostBack - </strong></em>Set this property to true, if you want the webform to be posted immediately when the checked status of the radio button changes.
                    <br /><br />
                    <em><strong>Group Name - </strong></em>By default, the individual radio button selections, are not mutually exclusive. If you have a group of radio buttons, and if you want the selections among the group to be mutually exclusive, then use the same group name for all the radio button controls.
                </p>
                <h4><em> Events: </em></h4>
                <p>CheckedChanged - This event is fired when the checked status of the radio button control is changed.</p>
                 
            </fieldset>
        </div>
    </form>
</body>
</html>
