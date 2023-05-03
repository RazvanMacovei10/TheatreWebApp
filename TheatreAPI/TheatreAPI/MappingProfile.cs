using AutoMapper;
using BusinessLogic.BL;
using DataLayer.DTOs;
using DataLayer.Entities;

namespace TheatreAPI
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterFormDTO, RegisterForm>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => Convert.FromBase64String(src.Image)));
            CreateMap<RegisterForm, RegisterFormDTO>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => Convert.ToBase64String(src.Image)));
            CreateMap<PlayDTO, Play>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => Convert.FromBase64String(src.Image)));
            CreateMap<Play, PlayDTO>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => Convert.ToBase64String(src.Image)));
            CreateMap<Event, EventSentDTO>()
                .ForMember(dest => dest.TheatreName, opt => opt.MapFrom(src => src.Theatre.User.UserName));
            CreateMap<EventSentDTO, Event>();
            CreateMap<Event, EventDTO>()
                .ForMember(dest => dest.TheatreName, opt => opt.MapFrom(src => src.Theatre.User.UserName));
            CreateMap<EventDTO, Event>();
            CreateMap<TheatreDTO, Theatre>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => Convert.FromBase64String(src.Image)))
                .ForMember(dest => dest.Events, opt => opt.MapFrom(src => src.Events));
            CreateMap<Theatre, TheatreDTO>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => Convert.ToBase64String(src.Image)))
                .ForMember(dest => dest.Events, opt => opt.MapFrom(src => src.Events));
            CreateMap<User, UserDTO>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.Name));
        }
    }
}
