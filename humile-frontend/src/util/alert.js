import swal from "sweetalert";

export const alert = (title, data, type) => {
  return swal(title, data, type);
};

export const warning = () => {
  return swal({
    title: "Are You Sure!",
    icon: "warning",
    dangerMode: true,
    buttons: true,
  });
};

export const languageWarning = (count) => {
  return swal({
    title: `Are You Sure!`,
    text: `There are ${count} host is in this language`,
    icon: "warning",
    dangerMode: true,
    buttons: true,
  });
};

