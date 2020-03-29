
using System.Linq;

namespace Application.Profiles
{
    public class MappingPhoto : AutoMapper.Profile
    {
        public MappingPhoto()
        {
            CreateMap<Domain.Photo, PhotoDto>();
            CreateMap<Domain.AppUser, Profile>()
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}