export default function  bindThis(obj, func)
{
  obj[func.name] = func.bind(obj);
}
